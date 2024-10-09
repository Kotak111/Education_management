const express = require('express');
const StudentController=require("../controller/student.controller");
const { auth, IsStudent } = require('../utils/auth');
const upload = require("../utils/multer")
const router = express.Router();
/**
 * @swagger
 * /courses/{id}/enroll:
 *   post:
 *     summary: Enroll in a course
 *     description: Students can enroll in a course by providing the course ID.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "652f4c1217e92f8762d98765"
 *         description: The ID of the course to enroll in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: "650f39f99f8b2c0410e121a4"
 *     responses:
 *       201:
 *         description: Successfully enrolled in the course
 *       400:
 *         description: Invalid data or already enrolled
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/courses/:id/enroll', auth,IsStudent,StudentController.enrollInCourse);

/**
 * @swagger
 * /assignments/{id}/submit:
 *   post:
 *     summary: Submit an assignment
 *     description: Students can submit their assignments for a specific assignment ID.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "652f4c1217e92f8762d98765"
 *         description: The ID of the assignment to submit
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The assignment file to submit
 *     responses:
 *       200:
 *         description: Assignment submitted successfully
 *       400:
 *         description: Invalid submission
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/assignments/:id/submit',auth,IsStudent,upload.single("file"),StudentController.submitAssignment);

/**
 * @swagger
 * /student/enrolments:
 *   get:
 *     summary: View enrolments
 *     description: Students can view their current enrolments.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrolled courses
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/student/enrolments', auth, IsStudent, StudentController.viewEnrolments);

/**
 * @swagger
 * /student/courses/{courseId}/assignments:
 *   get:
 *     summary: View assignments for a course
 *     description: Students can view assignments for a specific course.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "652f4c1217e92f8762d98765"
 *         description: The ID of the course to view assignments for
 *     responses:
 *       200:
 *         description: List of assignments for the course
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/student/courses/:courseId/assignments', auth, IsStudent, StudentController.viewAssignments);

/**
 * @swagger
 * /student/grades:
 *   get:
 *     summary: View student grades
 *     description: Students can view their grades for all courses.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of grades for the student
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/student/grades', auth, IsStudent, StudentController.viewGrades);


module.exports = router;
