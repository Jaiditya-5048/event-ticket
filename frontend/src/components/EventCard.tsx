import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Event, EventInstance } from '../utils/types/event_types';
import React, { useState } from 'react';
import { EventBookingModal } from './modals/EventBookingModal';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatDateTime';

type EventCardProps = {
  event: Event | EventInstance;
  type: 'event' | 'instance';
};

const EventCard: React.FC<EventCardProps> = ({ event, type }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventInstance | null>(
    null
  );
  const isInstance = type === 'instance';
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const eventId = event.event_id;   
  const displayName = isInstance
    ? (event as EventInstance).Event.name
    : (event as Event).name;

    // Display date logic
  const displayDate = isInstance
    ? formatDate((event as EventInstance).date_time)
    : (event as Event).EventInstances.length > 1
      ? `${formatDate((event as Event).EventInstances[0].date_time)} - ${formatDate((event as Event).EventInstances[(event as Event).EventInstances.length - 1].date_time)}`
      : formatDate((event as Event).EventInstances[0].date_time);
      
// formatDate((event as Event).EventInstances[0].date_time)
  const eventLocation = isInstance ? (event as EventInstance).Venue.city : null;

  const handleBookTicketsBtn = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      setSelectedEvent(event as EventInstance);
    } else {
      console.log('clicked');
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  return (
    <div className="max-w-sm border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/event/${eventId}`} className="text-blue-500 ">
        <div>
          <img
            src="../../public/components/event_card_pic.jpeg"
            alt={displayName}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          <p className="font-semibold text-lg">{displayName}</p>
          <p className="text-sm text-gray-500">{displayDate}</p>
          {isInstance && eventLocation && (
            <p className="text-sm text-gray-600">{eventLocation}</p>
          )}
        </div>
        <div className="flex justify-end items-center p-4 pt-2">
          {isInstance ? (
            <input
              type="button"
              value="Book Tickets"
              onClick={handleBookTicketsBtn}
              className="bg-amber-50 p-2 rounded-lg text-purple-600 cursor-pointer hover:bg-purple-200"
            />
          ) : (
            <span>View Details</span>
          )}
        </div>
      </Link>
      {selectedEvent && (
        <EventBookingModal
          eventInstance={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onBook={() => {
            alert('Event Booked!');
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default EventCard;
