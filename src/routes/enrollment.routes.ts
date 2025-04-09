import { Router } from 'express'
import enrollmentController from '../controllers/enrollment.controller'

const enrollmentRouter = Router()

enrollmentRouter.get('/', enrollmentController.getAllEnrollments)
enrollmentRouter.post('/', enrollmentController.enrollStudent)

export default enrollmentRouter