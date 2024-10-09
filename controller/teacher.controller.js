const Assignment = require('../models/assignment.model');
const Quiz = require('../models/quiz.model');
const Enrolment=require("../models/enroll.model");
const Grade = require('../models/grade.model');

// Upload Assignment
exports.addAssignment = async (req, res) => {
  try {
    const assignment = new Assignment({
      title: req.body.title,
      dueDate: req.body.dueDate
    });
    await assignment.save();
    res.status(201).json({ message: 'Assignment added', assignment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add assignment' });
  }
};

// Create Quiz
exports.createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz({
      title: req.body.title,
      questions: req.body.questions,
      createdBy:req.user._id
    });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created', quiz });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};
// Assign a grade to a student
exports.assignGrade = async (req, res) => {
  try {
    const { studentId, courseId, grade } = req.body;

   
    const enrolment = await Enrolment.findOne({ student: studentId, course: courseId });
    if (!enrolment) {
      return res.status(403).json({ error: 'Student is not enrolled in this course' });
    }

    
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can assign grades' });
    }

    // Assign the grade
    const newGrade = new Grade({
      student: studentId,
      course: courseId,
      teacher: req.user._id,
      grade
    });
    await newGrade.save();

    res.status(201).json({ message: 'Grade assigned successfully', newGrade });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign grade' });
  }
};