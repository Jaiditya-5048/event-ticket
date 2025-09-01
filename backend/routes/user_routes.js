import express from 'express';
import {
  deleteUser,
  editCurrentUser,
  getCurrentUser,
} from '../controllers/user.controller.js';
import authenticate from '../middleware/auth_middleware.js';
import { updateUserSchema } from '../validations/user.validations.js';
import { validateBody } from '../middleware/validates.js';
import { getUserBookings } from '../controllers/booking.controller.js';

const router = express.Router();

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: User not found
 */
router.get('/me', authenticate, getCurrentUser);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update current user's profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input or update failed
 */
router.put(
  '/me',
  authenticate,
  validateBody(updateUserSchema),
  editCurrentUser
);

/**
 * @swagger
 * /user/me:
 *   delete:
 *     summary: Soft delete the currently authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User soft-deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User soft-deleted successfully
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: User not found
 */
router.delete('/me', authenticate, deleteUser);

/**
 * @swagger
 * /user/bookings:
 *   get:
 *     summary: Get bookings for the authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings for the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   booking_id:
 *                     type: integer
 *                     example: 1
 *                   time:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-07-15T18:30:00.000Z"
 *                   venue:
 *                     type: string
 *                     example: "Wembley Stadium, London"
 *                   status:
 *                     type: string
 *                     example: "CONFIRMED"
 *                   quantity:
 *                     type: integer
 *                     example: 3
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get('/bookings', authenticate, getUserBookings);

export default router;
