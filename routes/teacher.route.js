const express = require('express');
const TeacherController=require("../controller/teacher.controller");
const { auth, IsTeacher } = require('../utils/auth');
const router = express.Router();
/**
 * @swagger
 * /courses/{id}/assignments:
 *   post:
 *     summary: Add an assignment to a course
 *     description: Teachers can add assignments to their courses.
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "652f4c1217e92f8762d98765"
 *         description: The ID of the course to add the assignment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Assignment 1: Linear Algebra"
 *               description:
 *                 type: string
 *                 example: "Complete the problem set on linear algebra."
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-15"
 *     responses:
 *       201:
 *         description: Assignment added successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/courses/:id/assignments',auth,IsTeacher,TeacherController.addAssignment);
/**
 * @swagger
 * /courses/{id}/quizzes:
 *   post:
 *     summary: Create a quiz for a course
 *     description: Teachers can create quizzes for their courses.
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "652f4c1217e92f8762d98765"
 *         description: The ID of the course to add the quiz to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Quiz 1: Calculus Basics"
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       example: "What is the derivative of x^2?"
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["2x", "x", "1", "None of the above"]
 *                     correctAnswer:
 *                       type: string
 *                       example: "2x"
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/courses/:id/quizzes', auth,IsTeacher,TeacherController.createQuiz);

/**
 * @swagger
 * /teacher/assign-grade:
 *   post:
 *     summary: Assign a grade to a student
 *     description: Teachers can assign grades to students in their courses.
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
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
 *               courseId:
 *                 type: string
 *                 example: "651f4d3017f82f8762c98765"
 *               grade:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       201:
 *         description: Grade assigned successfully
 *       400:
 *         description: Invalid input or student not enrolled
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */




//grade 
router.post('/teacher/assign-grade', auth, IsTeacher, TeacherController.assignGrade);

module.exports = router;
