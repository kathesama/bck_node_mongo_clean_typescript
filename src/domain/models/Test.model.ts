import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  content: { type: String }
});

export default testSchema;

export class TestModel {
  content: string;
}

