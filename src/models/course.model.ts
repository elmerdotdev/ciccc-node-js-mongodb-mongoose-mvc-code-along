import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  courseName: string;
}

const CourseSchema: Schema = new Schema({
  courseName: { type: String, required: true }
})

export const Course = mongoose.model<ICourse>('Course', CourseSchema)