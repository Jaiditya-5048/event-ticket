import express from 'express';
import { createEvent, deleteEvent, getEventsByOrganiser, getOrganiserEventById, updateEvent } from '../../controllers/event.controller.js';
import { validateBody } from '../../middleware/validates.js';
import { createEventSchema, updateEventSchema } from '../../validations/validations.js';


const router = express.Router();


/**
 * @swagger
 * /organiser/events:
 *   get:
 *     summary: Get all events created by the logged-in organiser
 *     tags: [Organiser Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of organiser's events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 */
router.get('/', getEventsByOrganiser);

/**
 * @swagger
 * /organiser/events:
 *   post:
 *     summary: Create a new event (organiser only)
 *     tags: [Organiser Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Concert
 *               description:
 *                 type: string
 *                 example: A live concert event featuring various artists.
 *               category_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Event created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Event created successfully
 */
router.post('/', validateBody(createEventSchema), createEvent);

/**
 * @swagger
 * /organiser/events/{id}:
 *   get:
 *     summary: Get a specific event by ID (organiser-owned)
 *     tags: [Organiser Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Event not found
 */
router.get('/:id', getOrganiserEventById);

/**
 * @swagger
 * /organiser/events/{id}:
 *   put:
 *     summary: Update an existing event (organiser only)
 *     tags: [Organiser Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Concert
 *               description:
 *                 type: string
 *                 example: Updated description of the concert event.
 *               category_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.put('/:id', validateBody(updateEventSchema), updateEvent);

/**
 * @swagger
 * /organiser/events/{id}:
 *   delete:
 *     summary: Delete an event (organiser only)
 *     tags: [Organiser Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted
 *       404:
 *         description: Event not found
 */
router.delete('/:id', deleteEvent);

export default router;
