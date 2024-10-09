const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }]
});

module.exports = mongoose.model('Course', courseSchema);
