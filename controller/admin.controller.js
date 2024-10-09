const courseModel = require("../models/course.model");
const Enrolment = require("../models/enroll.model");
const User = require("../models/user.model");


// Create Course
exports.createCourse = async (req, res) => {
  try {
    const course = new courseModel({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user._id // Admin ID
    });
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  try {
    const course = await courseModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Failed to update course' });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
};
// Enrol a student in a course
exports.enrolStudent = async (req, res) => {
    try {
      const { studentId, courseId } = req.body;
      
      // Check if the course and student exist
      const student = await User.findById(studentId);
      const course = await courseModel.findById(courseId);
      
      if (!student || !course) {
        return res.status(404).json({ error: 'Student or course not found' });
      }
  
      // Check if the student is already enrolled
      const existingEnrolment = await Enrolment.findOne({ student: studentId, course: courseId });
      if (existingEnrolment) {
        return res.status(400).json({ message: 'Student is already enrolled in this course' });
      }
  
      // Create new enrolment
      const enrolment = new Enrolment({ student: studentId, course: courseId });
      await enrolment.save();
  
      res.status(201).json({ message: 'Student enrolled successfully', enrolment });
    } catch (error) {
        console.log(error);
        
      res.status(500).json({ error: 'Failed to enrol student' });
    }
  };
  
  // Remove a student from a course
  exports.removeStudent = async (req, res) => {
    try {
      const { studentId, courseId } = req.body;
  
     
      const enrolment = await Enrolment.findOneAndDelete({ student: studentId, course: courseId });
  
      if (!enrolment) {
        return res.status(404).json({ error: 'Enrolment not found' });
      }
  
      res.status(200).json({ message: 'Student removed from course' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove student' });
    }
  };