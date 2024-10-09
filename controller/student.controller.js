const Course = require('../models/course.model');
const Assignment = require('../models/assignment.model');
const Enrolment = require('../models/enroll.model');
const Grade = require('../models/grade.model');

// Enroll in Course
exports.enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    req.user.enrolledCourses.push(course._id);
    await req.user.save();
    res.json({ message: 'Enrolled in course', course });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
};

// Submit Assignment
exports.submitAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    assignment.submissions.push({
      student: req.user._id,
      file: req.body.file,
      submittedAt: Date.now()
    });
    await assignment.save();
    res.json({ message: 'Assignment submitted', assignment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit assignment' });
  }
};
// View all enrolments of a student
exports.viewEnrolments = async (req, res) => {
    try {
      const enrolments = await Enrolment.find({ student: req.user._id }).populate('course');
  
      res.status(200).json({ enrolments });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch enrolments' });
    }
  };
  
  // View assignments of a course for a student
  exports.viewAssignments = async (req, res) => {
    try {
      const { courseId } = req.params;
  
      // Verify if the student is enrolled in the course
      const enrolment = await Enrolment.findOne({ student: req.user._id, course: courseId });
      if (!enrolment) {
        return res.status(403).json({ error: 'You are not enrolled in this course' });
      }
  
      const assignments = await Assignment.find({ course: courseId });
      res.status(200).json({ assignments });
    } catch (error) {
        console.log(error);
        
      res.status(500).json({ error: 'Failed to fetch assignments' });
    }
  };
// View grades for a student
exports.viewGrades = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.user._id }).populate('course').populate('teacher');

    res.status(200).json({ grades });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grades' });
  }
};