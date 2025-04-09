"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const courseRouter = (0, express_1.Router)();
courseRouter.get('/', course_controller_1.default.getAllCourses);
courseRouter.get('/search', course_controller_1.default.getCoursesByName);
courseRouter.get('/:id', course_controller_1.default.getCourseById);
courseRouter.post('/', course_controller_1.default.createCourse);
courseRouter.put('/:id', course_controller_1.default.updateCourseById);
courseRouter.delete('/:id', course_controller_1.default.deleteCourseById);
exports.default = courseRouter;
