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
const course_model_1 = require("../models/course.model");
// Get all courses
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_model_1.Course.find();
        res.status(200).json(courses);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to fetch all courses" });
    }
});
// Get course by id
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.Course.findById(req.params.id);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.status(200).json(course);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to get course" });
    }
});
// Get courses by name
const getCoursesByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const courses = yield course_model_1.Course.find({
            name: {
                $regex: name,
                $options: 'i'
            }
        });
        res.status(200).json(courses);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to search courses" });
    }
});
// Create new course
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseName } = req.body;
        const course = yield course_model_1.Course.create({ courseName });
        res.status(201).json(course);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Unable to add course' });
    }
});
// Update course by id
const updateCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true // return updated data
        });
        res.status(200).json(course);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update course" });
    }
});
// Delete course by id
const deleteCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_model_1.Course.findByIdAndDelete(req.params.id);
        res.status(200).json(course);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to delete course" });
    }
});
exports.default = {
    getAllCourses,
    getCourseById,
    getCoursesByName,
    createCourse,
    updateCourseById,
    deleteCourseById
};
