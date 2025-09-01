import express from 'express';
import {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
} from '../../controllers/venue.controller.js';
import { validateBody } from '../../middleware/validates.js';
import { createVenueSchema, updateVenueSchema } from '../../validations/validations.js';

const router = express.Router();

/**
 * @swagger
 * /organiser/venue:
 *   post:
 *     summary: Create a new venue
 *     tags: [Venues]
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       201:
 *         description: Venue created successfully
 */
router.post('/', validateBody(createVenueSchema), createVenue);

/**
 * @swagger
 * /organiser/venue:
 *   get:
 *     summary: Get all venues
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all venues
 */
router.get('/', getAllVenues);

/**
 * @swagger
 * /organiser/venue/{id}:
 *   get:
 *     summary: Get venue by ID
 *     tags: [Venues]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the venue
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venue details
 *       404:
 *         description: Venue not found
 */
router.get('/:id', getVenueById);

/**
 * @swagger
 * /organiser/venue/{id}:
 *   put:
 *     summary: Update venue by ID
 *     tags: [Venues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the venue to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       200:
 *         description: Venue updated successfully
 */
router.put('/:id', validateBody(updateVenueSchema), updateVenue);

/**
 * @swagger
 * /organiser/venue/{id}:
 *   delete:
 *     summary: Delete venue by ID
 *     tags: [Venues]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the venue to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venue deleted successfully
 */
router.delete('/:id', deleteVenue);

export default router;