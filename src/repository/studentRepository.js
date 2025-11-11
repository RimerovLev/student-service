import Student from '../model/student.js';

const students = new Map();

export const addStudent = ({id, name, password}) =>{
    if (students.has(id)){
        return false;
    }
    students.set(+id,  new Student(+id, name, password));
    return true;
}

export const findStudent = (id) => students.get(id);

export const deleteStudent = (id) => students.delete(id);

export const updateStudent = (id, name, password) => students.get(id).name = name;

export const addScore = (id, subject, score) => students.get(id).scores[subject] = score;

export const findStudentsByName = (name) => students.values();

export const countByNames = () => {};

export const findByMinScore = () => {};
