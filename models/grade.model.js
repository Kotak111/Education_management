const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GradeSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }, 
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
  grade: { type: String, required: true },  
  dateAssigned: { type: Date, default: Date.now }
});

const Grade = mongoose.model('Grade', GradeSchema);
module.exports=Grade;
