import express from 'express';
import { createInstance, deleteInstance, updateInstance } from '../../controllers/eventInstance.controller.js';


const router = express.Router();


/**
 * @swagger
 * /organiser/instance:
 *   post:
 *     summary: Create a new Instance (organiser only)
 *     tags: [Organiser Instances]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event_id
 *               - venue_id
 *               - artist_id
 *               - date_time
 *               - capacity
 *             properties:
 *               event_id:
 *                 type: integer
 *                 example: 1
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *               artist_id:
 *                 type: integer
 *                 example: 1
 *               date_time:
 *                 type: string
 *                 example: "2023-10-01T18:00:00Z"
 *               capacity:
 *                 type: integer
 *                 example: 100
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
router.post('/', createInstance);

/**
 * @swagger
 * /organiser/instance/{instance_id}:
 *   put:
 *     summary: Update an existing instance (organiser only)
 *     tags: [Organiser Instances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: instance_id
 *         in: path
 *         required: true
 *         description: Instance ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - venue_id
 *               - capacity
 *             properties:
 *               venue_id:
 *                 type: integer
 *                 example: 1
 *               capacity:
 *                 type: integer
 *                 example: 1000
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
router.put('/:id', updateInstance);

/**
 * @swagger
 * /organiser/instance/{id}:
 *   delete:
 *     summary: Delete an instance (organiser only)
 *     tags: [Organiser Instances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Instance ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instance deleted
 *       404:
 *         description: Instance not found
 */
router.delete('/:id', deleteInstance);

export default router;
