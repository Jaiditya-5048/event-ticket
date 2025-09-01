import { searchController } from '../controllers/search.controller.js';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search across events, venues, or artists
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search by name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [event, venue, artist]
 *         required: false
 *         description: Optional category to narrow the search
 *     responses:
 *       200:
 *         description: Search results grouped by category
 *       400:
 *         description: Missing query string
 *       500:
 *         description: Server error
 */
router.get('/', searchController);

export default router;
