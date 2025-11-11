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
    repo.deleteStudent(+req.params.id);
    res.status(204).send();
}

export const updateStudent = (req, res) => {
    repo.updateStudent(+req.params.id, req.body.name, req.body.password);
    res.status(204).send();
}

export const addScore = (req, res) => {

}

export const findStudentsByName = (req, res) => {
    const students = repo.findStudentsByName(req.query.name);
    res.json(Array.from(students));
}

export const countByNames = (req, res) => {
    const students = repo.findStudentsByName(req.query.name);
    res.json(Array.from(students).length);
}

export const findByMinScore = (req, res) => {
    //todo find by min score
}