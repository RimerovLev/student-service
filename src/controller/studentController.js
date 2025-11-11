import * as repo from '../repository/studentRepository.js';

export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if (success){
        res.status(204).send();
    } else {
        res.status(409).json({});
    }
}

export const findStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if (student){
        const { password, ...studentWithoutPassword } = student;
        res.json(studentWithoutPassword);
    } else {
        res.status(404).json({});
    }
}

export const deleteStudent = (req, res) => {
    //TODO delete student
}

export const updateStudent = (req, res) => {
    //TODO update student
}

export const addScore = (req, res) => {
    //Todo add score
}

export const findStudentsByName = (req, res) => {
    //todo find student by name
}

export const countByNames = (req, res) => {
    //todo count by names
}

export const findByMinScore = (req, res) => {
    //todo find by min score
}