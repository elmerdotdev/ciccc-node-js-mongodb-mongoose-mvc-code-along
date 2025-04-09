import { Router } from 'express'
import courseController from '../controllers/course.controller'

const courseRouter = Router()

courseRouter.get('/', courseController.getAllCourses)
courseRouter.get('/search', courseController.getCoursesByName)
courseRouter.get('/:id', courseController.getCourseById)
courseRouter.post('/', courseController.createCourse)
courseRouter.put('/:id', courseController.updateCourseById)
courseRouter.delete('/:id', courseController.deleteCourseById)

export default courseRouter