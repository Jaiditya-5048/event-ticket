import express from 'express';
import authenticate from '../middleware/auth_middleware.js';
import { getTicketTypesByInstance } from '../controllers/ticketType.controller.js';
import {
  getInstanceById,
  getInstancesByCity,
} from '../controllers/eventInstance.controller.js';
import { createBooking } from '../controllers/booking.controller.js';

const router = express.Router();

//get all instances or by city
/**
 * @swagger
 * /instances:
 *   get:
 *     summary: Get event instances by city
 *     tags: [user- Instances]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter event instances by city name (case-insensitive, partial match allowed)
 *     responses:
 *       200:
 *         description: A list of event instances (filtered by city if provided)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   instance_id:
 *                     type: integer
 *                   event_id:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     description: Formatted date (e.g. "5 Jul")
 *                   venue:
 *                     type: object
 *                     properties:
 *                       venue_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       city:
 *                         type: string
 *                   event:
 *                     type: object
 *                     properties:
 *                       event_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       404:
 *         description: No instances found for the specified city
 *       500:
 *         description: Server error
 */
router.get('/', getInstancesByCity);

//get single instance by id
/**
 * @swagger
 * /instances/{id}:
 *   get:
 *     summary: Get a single event instance by ID
 *     tags: [user- Instances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event instance
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event instance details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 instance_id:
 *                   type: integer
 *                 event_id:
 *                   type: integer
 *                 date_time:
 *                   type: string
 *                 Venue:
 *                   type: object
 *                   properties:
 *                     venue_id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *       404:
 *         description: Instance not found
 *       500:
 *         description: Server error
 */
router.get('/:instanceId', getInstanceById);

//get ticket types by instance id
/**
 * @swagger
 * /instances/{instanceId}/ticket-types:
 *   get:
 *     summary: Get ticket types for a specific event instance
 *     tags:
 *       - user- Instances - TicketTypes
 *     parameters:
 *       - in: path
 *         name: instanceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event instance
 *     responses:
 *       200:
 *         description: A list of ticket types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ticket_type_id:
 *                     type: integer
 *                     example: 1
 *                   instance_id:
 *                     type: integer
 *                     example: 5
 *                   name:
 *                     type: string
 *                     example: VIP
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 999.99
 *                   seat_limit:
 *                     type: integer
 *                     example: 25
 *       400:
 *         description: Invalid instance ID
 *       500:
 *         description: Internal server error
 */
router.get('/:instanceId/ticket-types', getTicketTypesByInstance);

//create booking for an instance
/**
 * @swagger
 * /instances/{instance_id}/bookings:
 *   post:
 *     summary: Create a new booking for an event instance
 *     tags:
 *       - user- Instances - Bookings
 *     security:
 *       - bearerAuth: []  # Authorization header with Bearer token
 *     parameters:
 *       - in: path
 *         name: instance_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event instance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticket_type_id
 *               - quantity
 *             properties:
 *               ticket_type_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the ticket type to book
 *               quantity:
 *                 type: integer
 *                 example: 2
 *                 description: Number of tickets to book
 *               seat_numbers:
 *                 type: array
 *                 description: List of seat numbers (required if booking with seats)
 *                 items:
 *                   type: string
 *                 example: ["A1", "A2"]
 *     responses:
 *       201:
 *         description: Booking successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Booking successful
 *       400:
 *         description: Bad request (e.g. invalid ticket_type_id or mismatch in quantity vs seat_numbers)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */
router.post('/:instanceId/booking', authenticate, createBooking);

export default router;
