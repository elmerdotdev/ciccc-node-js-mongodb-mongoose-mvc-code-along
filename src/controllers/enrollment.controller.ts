import { Request, Response } from 'express'
import { Enrollment } from '../models/enrollment.model'

// Get all enrollments
const getAllEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await Enrollment.find().populate('studentId').populate('courseId')
    res.status(200).json(enrollments)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to get enrollments" })
  }
}

// Enroll student to course
const enrollStudent = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId } = req.body
    const newEnrollment = await Enrollment.create({ studentId, courseId })
    res.status(201).json(newEnrollment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Unable to enroll student" })
  }
}

export default {
  getAllEnrollments,
  enrollStudent
}