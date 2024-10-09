const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrolmentSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }, 
  enrolmentDate: { type: Date, default: Date.now },
  status: { type: String, default: 'active' }  
});

const Enrolment= mongoose.model('Enrolment', EnrolmentSchema);
module.exports=Enrolment;
