
const Messages = {
  User: {
    FETCH_SUCCESS: 'User fetched successfully',
    CREATED: 'User created successfully',
    UPDATED: 'User updated successfully',
    DELETED: 'User deleted successfully',
    NOT_FOUND: 'User not found',
    EMAIL_ERROR: 'Email already registered',
  },
  Auth: {
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_CREDENTIALS: 'Invalid email or password',
  },
  General: {
    FETCH_SUCCESS: 'Retrieved successfully',
    NOT_FOUND: 'Data not found',
    SERVER_ERROR: 'Internal server error',
    BAD_REQUEST: 'Bad request',
    ERROR_NO_CHANGES: 'No changes detected'
  },
  Venue: {
    CREATED: 'Venue created successfully',
    UPDATED: 'Venue updated successfully',
    DELETED: 'Venue deleted successfully',
    DELETE_NOT_ALLOWED: 'Cannot delete venue with existing event instances',
  },
  Ticket_types: {
    CREATED: 'Ticket type created successfully',
    UPDATED: 'Ticket type updated successfully',
    DELETED: 'Ticket type deleted successfully',
    UPDATED_ERROR: 'Error updating Ticket Type',
    DELETED_ERROR: 'Cannot delete TicketType: tickets already exist for this type.',
    UPDATE_AVAILABLE_SEATS_ERROR: 'Available_seats cannot be updated manually',
    UPDATE_TOTAL_SEATS_ERROR: 'total_seats cannot be decreased',
  },
  Event_instance: {
    CREATED: 'Incident created successfully',
    UPDATED: 'Incident updated successfully',
    DELETED: 'Incident deleted successfully',
    DELETE_ERROR_TCIEKTS_SOLD: 'Cannot delete instance — tickets already sold',
  },
  Search: {
    SEARCH_COMPLETED: 'Search completed',
    QUERY_REQUIERED_ERROR: 'Search query is required',
  },
  Instance_Artist: {
    CREATED: 'Artist added to instance successfully',
    DELETED: 'Artist removed from Instance successfully',
    DELETE_MISSING_FIELD_ERROR: 'Missing instance_id or artist_id',
  },
  Event: {
    CREATED: 'Event created successfully',
    UPDATED: 'Event updated successfully',
    DELETED: 'Event deleted successfully',
    DELETE_ERROR_DUE_ACTIVE_INSTANCE: 'Cannot delete event with existing instances',
  },
  Booking: {
    CREATED: 'Booking created successfully',
    SEATS_AVAILABILITY_ERROR: 'Not enough available seats',
    SEAT_NUMBER_ERROR:'Number of seat numbers must match quantity',
  },
  Auth: {
    USER_NOT_FOUND: 'Invalid email, User not found',
    INVALID_CREDENTIALS: 'Invalid password'
  },
  Artist: {
    CREATED: 'Artist created successfully',
    UPDATED: 'Artist updated successfully',
    DELETED: 'Artist deleted successfully',
    DELETE_ERROR_DUE_ACTIVE_INSTANCE: 'Cannot delete artist with existing event instances',
  }

};

export default Messages;
