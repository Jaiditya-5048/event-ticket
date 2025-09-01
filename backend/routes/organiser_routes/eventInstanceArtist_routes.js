import express from 'express';
import { createInstanceArtist, deleteInstanceArtist } from '../../controllers/eventInstanceArtist.controller.js';
import { validateBody } from '../../middleware/validates.js';
import { createInstanceArtistSchema } from '../../validations/validations.js';

const router =express.Router();

/**
 * @swagger
 * /organiser/instance-artist:
 *   post:
 *     summary: Create a new Instance Artist (organiser only)
 *     tags: [Organiser Instance Artist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - instance_id
 *               - artist_id
 *             properties:
 *               instance_id:
 *                 type: integer
 *                 example: 1
 *               artist_id:
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
router.post('/', validateBody(createInstanceArtistSchema), createInstanceArtist);

/**
 * @swagger
 * /organiser/instance-artist:
 *   delete:
 *     summary: Delete an instance artist (organiser only)
 *     tags: [Organiser Instance Artist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: instance_id
 *         in: query
 *         required: true
 *         description: ID of the event instance
 *         schema:
 *           type: integer
 *       - name: artist_id
 *         in: query
 *         required: true
 *         description: ID of the artist
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Instance artist deleted successfully
 *       404:
 *         description: Instance artist not found
 */
router.delete('/', deleteInstanceArtist);

export default router;