import mongoose, { Schema, Document } from "mongoose";

export interface IEnrollment extends Document {
  studentId: mongoose.Schema.Types.ObjectId
  courseId: mongoose.Schema.Types.ObjectId
  enrollmentDate: Date
}

const EnrollmentSchema: Schema = new Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
  courseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
  enrollmentDate: { type: Date, required: true, default: Date.now }
})

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema)