const express = require('express');
const AdminController=require("../controller/admin.controller");

const { IsAdmin, auth } = require('../utils/auth');
const router = express.Router();
/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     description: Admin can create a new course by providing the necessary details.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to Mathematics"
 *               description:
 *                 type: string
 *                 example: "A basic introduction to mathematical concepts."
 *               duration:
 *                 type: number
 *                 example: 12
 *     responses:
 *       201:
 *         description: Course created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/courses', auth,IsAdmin, AdminController.createCourse);
/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course
 *     description: Admin can update the details of an existing course.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "652f4c1217e92f8762d98765"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Advanced Mathematics"
 *               description:
 *                 type: string
 *                 example: "This course now covers advanced mathematical concepts."
 *               duration:
 *                 type: number
 *                 example: 14
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/courses/:id',auth, IsAdmin, AdminController.updateCourse);
/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Admin can delete a course by providing its ID.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "652f4c1217e92f8762d98765"
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/courses/:id',auth, IsAdmin, AdminController.deleteCourse);

/**
 * @swagger
 * /admin/enrol:
 *   post:
 *     summary: Enrol a student in a course
 *     description: Admin can enrol a student into a course.
 *     tags: [Admin]
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
 *     responses:
 *       201:
 *         description: Student enrolled successfully
 *       400:
 *         description: Student is already enrolled in the course
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Student or course not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/admin/enrol', auth, IsAdmin, AdminController.enrolStudent);
/**
 * @swagger
 * /admin/remove:
 *   post:
 *     summary: Remove a student from a course
 *     description: Admin can remove a student from a course.
 *     tags: [Admin]
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
 *     responses:
 *       200:
 *         description: Student removed successfully
 *       400:
 *         description: Student is not enrolled in the course
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Student or course not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/admin/remove', auth, IsAdmin, AdminController.removeStudent);


module.exports = router;
