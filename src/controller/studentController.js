import * as repo from '../repository/studentRepository.js';
import {countByNames} from "../repository/studentRepository.js";

export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if (success){
        res.status(204).send();
    } else {
        res.status(409).json({message: "Student not found" });
    }
}

export const findStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if (student){
        const { password, ...studentWithoutPassword } = student;
        res.json(studentWithoutPassword);
    } else {
        res.status(404).json({message: "Student not found" });
    }
}

export const deleteStudent = (req, res) => {
    const deleted =  repo.deleteStudent(+req.params.id);
    if(!deleted){
        res.status(404).json({message: "Student not found" });
    }
    res.status(204).send("Student deleted");
}

export const updateStudent = (req, res) => {
   const id = +req.params.id;
   const{name, password} = req.body;
   const updatedStudent = repo.updateStudent(id, name, password);

   if(!updatedStudent){
       res.status(404).json({message: "Student not found" });
   }

   res.status(200).send(updatedStudent);
}

export const addScore = (req, res) => {
    const id = +req.params.id;
    const {subject, score} = req.body;
    const updateStudent = repo.updateStudent(id, subject, score);

    if (!updateStudent) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(201).json(updatedStudent);
}

export const findStudentsByName = (req, res) => {
    const name = req.params.name;
    const students = repo.findStudentsByName(name);
    res.json(students);
}

export const countByNamesController = (req, res) => {
    const name = req.params.name;
    const count = repo.countByNames(req.params.name);
    return res.json({name, count});
}

export const findByMinScore = (req, res) => {
    const subject = req.params.subject;
    const minScore = +req.params.minScore;
    const students = findByMinScore(subject, minScore);
    res.json(students);
}