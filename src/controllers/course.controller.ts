import { Request, Response } from 'express'
import { Course, ICourse } from '../models/course.model'

// Get all courses
const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find()
    res.status(200).json(courses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to fetch all courses" })
  }
}

// Get course by id
const getCourseById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      res.status(404).json({ message: "Course not found" })
      return
    }
    res.status(200).json(course)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to get course" })
  }
}

// Get courses by name
const getCoursesByName = async (req: Request<{}, {}, {}, { name: string }>, res: Response) => {
  try {
    const { name } = req.query
    const courses = await Course.find({
      name: {
        $regex: name,
        $options: 'i'
      }
    })
    res.status(200).json(courses)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to search courses" })
  }
}

// Create new course
const createCourse = async (req: Request<{}, {}, ICourse>, res: Response) => {
  try {
    const { courseName } = req.body
    const course = await Course.create({ courseName })
    res.status(201).json(course)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Unable to add course' })
  }
}

// Update course by id
const updateCourseById = async (req: Request<{ id: string }, {}, Partial<ICourse>>, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true // return updated data
    })
    res.status(200).json(course)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to update course" })
  }
}

// Delete course by id
const deleteCourseById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    res.status(200).json(course)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to delete course" })
  }
}

export default {
  getAllCourses,
  getCourseById,
  getCoursesByName,
  createCourse,
  updateCourseById,
  deleteCourseById
}