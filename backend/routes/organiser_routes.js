import express from 'express';
import authenticate from '../middleware/auth_middleware.js';
import authorize from '../middleware/authorize_middleware.js';
import artistRoutes from './organiser_routes/artists_routes.js';
import venueRoutes from './organiser_routes/venue_routes.js';
import eventRoutes from './organiser_routes/event_routes.js';
import instanceRoutes from './organiser_routes/instance_routes.js';
import eventInstanceArtistRoutes from './organiser_routes/eventInstanceArtist_routes.js';
import ticketTypeRoutes from './organiser_routes/ticket_type_routes.js';

const router = express.Router();

// Organiser Routes for managing events
router.use('/events', authenticate, authorize(['organiser', 'admin']), eventRoutes);

// Organiser Routes for managing event instances
router.use('/instance', authenticate, authorize(['organiser', 'admin']), instanceRoutes);

// Organiser Routes for managing artists
router.use('/artists', authenticate, authorize(['organiser', 'admin']), artistRoutes);

// Organiser Routes for managing venues
router.use('/venue', authenticate, authorize(['organiser', 'admin']), venueRoutes);

// Organiser Routes for managing event instance artists
router.use('/instance-artist', authenticate, authorize(['organiser', 'admin']), eventInstanceArtistRoutes);

// Organiser Routes for managing tickets
router.use('/ticket-types', authenticate, authorize(['organiser', 'admin']), ticketTypeRoutes);



export default router;
 