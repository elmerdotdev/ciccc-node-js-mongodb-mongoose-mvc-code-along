import { Router } from 'express'
import studentController from '../controllers/student.controller'

const studentRouter = Router()

studentRouter.get('/', studentController.getAllStudents)
studentRouter.get('/search', studentController.getStudentsByFirstname)
studentRouter.get('/:id', studentController.getStudentById)
studentRouter.post('/', studentController.createStudent)
studentRouter.put('/:id', studentController.updateStudentById)
studentRouter.delete('/:id', studentController.deleteStudentById)

export default studentRouter