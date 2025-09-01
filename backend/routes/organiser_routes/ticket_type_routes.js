import express from 'express';
import * as controller from '../../controllers/ticketType.controller.js';
import { validateBody } from '../../middleware/validates.js';
import { createTicketTypeSchema, updateTicketTypeSchema } from '../../validations/validations.js';

const router = express.Router();

/**
 * @swagger
 * /organiser/ticket-types:
 *   get:
 *     summary: Get all ticket types under a organiser
 *     tags: [TicketTypes]
 *     responses:
 *       200:
 *         description: A list of ticket types
 */
router.get('/', controller.getAllUnderOrganiser);

/**
 * @swagger
 * /organiser/ticket-types/{id}:
 *   get:
 *     summary: Get a ticket type by ID
 *     tags: [TicketTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Ticket type object }
 *       404: { description: Not Found }
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /organiser/ticket-types:
 *   post:
 *     summary: Create a new ticket type
 *     tags: [TicketTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - instance_id
 *               - name
 *               - price
 *               - total_seats
 *             properties:
 *              instance_id:
 *                type: integer
 *                example: 1
 *                description: ID of the event instance
 *              name:
 *               type: string
 *               example: VIP Ticket
 *               description: Name of the ticket type
 *              price:
 *                type: number
 *                format: float
 *                example: 99.99
 *                description: Price of the ticket type
 *              total_seats:
 *                type: integer
 *                example: 100
 *                description: Total number of seats available for this ticket type
 *     responses:
 *       201: { description: Created successfully }
 */
router.post('/', validateBody(createTicketTypeSchema), controller.create);

/**
 * @swagger
 * /organiser/ticket-types/{id}:
 *   put:
 *     summary: Update a ticket type
 *     tags: [TicketTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - total_seats
 *             properties:
 *              name:
 *               type: string
 *               example: VIP
 *               description: Name of the ticket type
 *              price:
 *                type: number
 *                format: float
 *                example: 99.99
 *                description: Price of the ticket type
 *              total_seats:
 *                type: integer
 *                example: 100
 *                description: Total number of seats available for this ticket type
 *             
 *     responses:
 *       200: { description: Updated successfully }
 */
router.put('/:id', validateBody(updateTicketTypeSchema), controller.update);

/**
 * @swagger
 * /organiser/ticket-types/{id}:
 *   delete:
 *     summary: Delete a ticket type
 *     tags: [TicketTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Deleted successfully }
 */
router.delete('/:id', controller.remove);

export default router;
