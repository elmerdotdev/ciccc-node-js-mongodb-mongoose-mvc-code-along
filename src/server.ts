import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import studentRouter from './routes/student.routes'
import courseRouter from './routes/course.routes'
import enrollmentRouter from './routes/enrollment.routes'

const app = express()

app.use(express.json())

app.use('/students', studentRouter)
app.use('/courses', courseRouter)
app.use('/enrollments', enrollmentRouter)

app.use((req: Request, res: Response) => {
  res.status(404).send('Invalid route!')
})

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.DATABASE_URI!

mongoose
  .connect(MONGODB_URI, { dbName: 'school' })
  .then(() => {
    console.log(`Connected to MongoDB`)
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error(err)
    throw err
  })