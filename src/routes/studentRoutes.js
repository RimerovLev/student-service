import { Router } from "express";
import {
    addStudent,
    findStudent,
    deleteStudent,
    updateStudent,
    addScore,
    findStudentsByName,
    countByNames,
    findByMinScore,
} from "../controller/studentController.js";

const router = Router();

// Students CRUD
router.post("/student", addStudent);
router.get("/student/:id", findStudent);
router.delete("/student/:id", deleteStudent);
router.patch("/student/:id", updateStudent);

// Add score to a student
router.patch("/score/student/:id", addScore);

// Search and aggregates
router.get("/students/name/:name", findStudentsByName);
router.get("/quantity/students", countByNames); // expects query params: names=Peter&names=John
router.get("/students/exam/:exam/minscore/:minScore", findByMinScore);

export default router;