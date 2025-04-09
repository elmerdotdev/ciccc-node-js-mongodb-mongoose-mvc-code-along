import mongoose, { Schema, Document} from "mongoose";

export interface IStudent extends Document {
  firstname: string;
  lastname: string;
  age: number
}

const StudentSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true }
})

export const Student = mongoose.model<IStudent>('Student', StudentSchema)