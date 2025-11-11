import test from 'node:test';
import assert from 'node:assert/strict';

import { addStudent } from '../src/controller/studentController.js';

function makeMockRes() {
  return {
    statusCode: undefined,
    jsonBody: undefined,
    jsonSent: false,
    sentStatusCode: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.jsonBody = body;
      this.jsonSent = true;
      return this;
    },
    sendStatus(code) {
      this.sentStatusCode = code;
      return this;
    },
  };
}

function makeReq(body) {
  return { body };
}

// Note: The controller uses an in-memory Map that persists across tests within this process.
// Use unique IDs per test to avoid state collisions, except where duplicate behavior is validated.

test('addStudent → 204 No Content on valid input', () => {
  const res = makeMockRes();
  const id = Math.floor(Math.random() * 1e9);
  const req = makeReq({ id, name: 'Peter', password: '1234' });

  addStudent(req, res);

  assert.equal(res.sentStatusCode, 204, 'Expected HTTP 204 for successful insertion');
  assert.equal(res.statusCode, undefined, 'Should not have called res.status for 204 path');
  assert.equal(res.jsonSent, false, 'Should not send a JSON body for 204');
});

test('addStudent → 409 Conflict when id already exists', () => {
  const id = Math.floor(Math.random() * 1e9);

  // First insertion should succeed
  let res1 = makeMockRes();
  addStudent(makeReq({ id, name: 'John', password: 'pw' }), res1);
  assert.equal(res1.sentStatusCode, 204, 'First insert should return 204');

  // Second insertion with same id should conflict
  let res2 = makeMockRes();
  addStudent(makeReq({ id, name: 'John', password: 'pw' }), res2);
  assert.equal(res2.sentStatusCode, 409, 'Second insert with same id should return 409');
  assert.equal(res2.jsonSent, false, 'Conflict response should have empty body');
});

test('addStudent → 400 when id is not a number', () => {
  const res = makeMockRes();
  addStudent(makeReq({ id: 'abc', name: 'Alice', password: 'pw' }), res);

  assert.equal(res.statusCode, 400, 'Expected 400 for invalid id');
  assert.equal(typeof res.jsonBody, 'object', '400 should include a JSON body');
  assert.match(res.jsonBody.message, /id.*number/i);
  assert.equal(res.sentStatusCode, undefined, 'Should not call sendStatus for 400 path');
});

test('addStudent → 400 when name is empty/whitespace', () => {
  const res = makeMockRes();
  const id = Math.floor(Math.random() * 1e9);
  addStudent(makeReq({ id, name: '   ', password: 'pw' }), res);

  assert.equal(res.statusCode, 400, 'Expected 400 for empty name');
  assert.match(res.jsonBody.message, /name.*non-empty/i);
});

test('addStudent → 400 when password is empty', () => {
  const res = makeMockRes();
  const id = Math.floor(Math.random() * 1e9);
  addStudent(makeReq({ id, name: 'Bob', password: '' }), res);

  assert.equal(res.statusCode, 400, 'Expected 400 for empty password');
  assert.match(res.jsonBody.message, /password.*non-empty/i);
});
