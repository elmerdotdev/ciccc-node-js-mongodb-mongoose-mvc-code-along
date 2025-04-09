import { Request, Response } from 'express'
import { Student, IStudent } from '../models/student.model'

// Get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find()
    res.status(200).json(students)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to fetch all students" })
  }
}

// Get student by id
const getStudentById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      res.status(404).json({ message: "Student not found" })
      return
    }
    res.status(200).json(student)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to get student" })
  }
}

// Get students by firstname
const getStudentsByFirstname = async (req: Request<{}, {}, {}, { firstname: string }>, res: Response) => {
  try {
    const { firstname } = req.query
    const students = await Student.find({
      firstname: {
        $regex: firstname,
        $options: 'i'
      }
    })
    res.status(200).json(students)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to search students" })
  }
}

// Create new student
const createStudent = async (req: Request<{}, {}, IStudent>, res: Response) => {
  try {
    const { firstname, lastname, age } = req.body
    const student = await Student.create({ firstname, lastname, age })
    res.status(201).json(student)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Unable to add student' })
  }
}

// Update student by id
const updateStudentById = async (req: Request<{ id: string }, {}, Partial<IStudent>>, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true // return updated data
    })
    res.status(200).json(student)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to update student" })
  }
}

// Delete student by id
const deleteStudentById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    res.status(200).json(student)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to delete student" })
  }
}

export default {
  getAllStudents,
  getStudentById,
  getStudentsByFirstname,
  createStudent,
  updateStudentById,
  deleteStudentById
}