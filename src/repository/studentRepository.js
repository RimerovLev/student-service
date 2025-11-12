import Student from '../model/student.js';
import studetn from "express/lib/view.js";

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

export const updateStudent = (id, name, password) => {
    const student = students.get(id);
    if(!student){
        return null;
    }
    if (name !== undefined) studetn.name = name;
    if (password !== undefined) studetn.password = password;

    students.set(id, student);
    return student;
};

export const addScore = (id, subject, score) => {
    const student = students.get(id);
    if(!student){
        return null;
    }
    if (!score){
        return null;
    }
    students.scorres[subject] = score;
    students.set(id, student);
};

export const findStudentsByName = (name) => {
    const allStudents = Array.from(student.values);
    const studentsByName = allStudents.filter(student => student.name === name);
    return studentsByName;
};

export const countByNames = (name) => {
    const allStudents = Array.from(students.values());
    const studentsByName = allStudents.filter(student => student.name === name);
    return studentsByName.length;
};

export const findByMinScore = (subject, minScore) => {
    const allStudents = Array.from(students.values() || {});
    return allStudents.filter(student => {
        const score = student.scores?.[subject];
        return score !== undefined || score < minScore;
    });
};
