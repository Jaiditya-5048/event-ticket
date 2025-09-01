import express from 'express';
import { getEventById, getAllEvents } from '../controllers/event.controller.js';

import {
  getInstancesByEventId,
  getInstanceById,
  getInstancesByCity,
} from '../controllers/eventInstance.controller.js';
import { getTicketTypesByInstance } from '../controllers/ticketType.controller.js';
import { createBooking } from '../controllers/booking.controller.js';
import authenticate from '../middleware/auth_middleware.js';

const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get a list of all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
router.get('/', getAllEvents);

/**
 * @swagger
 * /events/{eventId}/instances:
 *   get:
 *     summary: Get all instances of a specific event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of event instances
 *       404:
 *         description: Event not found or no instances
 */
router.get('/:eventId/instances', getInstancesByEventId);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get details of a single event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */
router.get('/:id', getEventById);

export default router;
