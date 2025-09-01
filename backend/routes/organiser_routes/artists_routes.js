import express from 'express';
import {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
} from '../../controllers/artist.controller.js';
import { validateBody } from '../../middleware/validates.js';
import { addArtistSchema, updateArtistSchema } from '../../validations/validations.js';

const router = express.Router();


/**
 * @swagger
 * /organiser/artists:
 *   post:
 *     summary: Create a new artist
 *     tags: [Artists]
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
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artist created successfully
 */
router.post('/', validateBody(addArtistSchema), createArtist);

/**
 * @swagger
 * /organiser/artists:
 *   get:
 *     summary: Get all artists
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all artists
 */
router.get('/', getAllArtists);

/**
 * @swagger
 * /organiser/artists/{id}:
 *   get:
 *     summary: Get artist by ID
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the artist
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artist details
 *       404:
 *         description: Artist not found
 */
router.get('/:id', getArtistById);

/**
 * @swagger
 * /organiser/artists/{id}:
 *   put:
 *     summary: Update artist by ID
 *     tags: [Artists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the artist to update
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
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artist updated successfully
 */
router.put('/:id', validateBody(updateArtistSchema), updateArtist);

/**
 * @swagger
 * /organiser/artists/{id}:
 *   delete:
 *     summary: Delete artist by ID
 *     tags: [Artists]
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the artist to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artist deleted successfully
 */
router.delete('/:id', deleteArtist);

export default router;