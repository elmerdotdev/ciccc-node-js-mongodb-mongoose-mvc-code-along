"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = require("../models/student.model");
// Get all students
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield student_model_1.Student.find();
        res.status(200).json(students);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to fetch all students" });
    }
});
// Get student by id
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield student_model_1.Student.findById(req.params.id);
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json(student);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to get student" });
    }
});
// Get students by firstname
const getStudentsByFirstname = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname } = req.query;
        const students = yield student_model_1.Student.find({
            firstname: {
                $regex: firstname,
                $options: 'i'
            }
        });
        res.status(200).json(students);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to search students" });
    }
});
// Create new student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, age } = req.body;
        const student = yield student_model_1.Student.create({ firstname, lastname, age });
        res.status(201).json(student);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to add student' });
    }
});
// Update student by id
const updateStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield student_model_1.Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true // return updated data
        });
        res.status(200).json(student);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update student" });
    }
});
// Delete student by id
const deleteStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield student_model_1.Student.findByIdAndDelete(req.params.id);
        res.status(200).json(student);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to delete student" });
    }
});
exports.default = {
    getAllStudents,
    getStudentById,
    getStudentsByFirstname,
    createStudent,
    updateStudentById,
    deleteStudentById
};
