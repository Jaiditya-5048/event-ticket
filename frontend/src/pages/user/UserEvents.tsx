import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';
import { getAllEvents } from '../../apis/services/event_api';
import { Event } from '../../utils/types/event_types';

function UserEvents() {
  const [events, setEvents] = useState<Event[] | []>([]);

  // Fetch events from API on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response: Event[] = await getAllEvents();
        console.log(response);

        setEvents(response || []);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 h-[30%] bg-purple-600 text-2xl text-white p-4 text-center">
        <p>Discover Amazing Events</p>
        <p>
          Browse through our collection of exciting events happening around you
        </p>
      </div>

      <div className="max-w-[70%] mx-auto p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {events.map((event) => (
          <EventCard key={event.event_id} event={event} type="event" />
        ))}
      </div>
    </>
  );
}

export default UserEvents;
