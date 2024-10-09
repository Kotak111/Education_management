const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: String,
  dueDate: Date,
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    file: String,
    submittedAt: Date
  }]
});

module.exports = mongoose.model('Assignment', assignmentSchema);
