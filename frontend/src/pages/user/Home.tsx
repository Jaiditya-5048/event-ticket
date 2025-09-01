import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard';
import { useUserLocation } from '../../context/UserLocationContext';
import { EventInstance } from '../../utils/types/event_types';
import { fetchInstancesByLocation } from '../../apis/services/instance_api';

function Home() {
  const [eventInstances, setEventInstances] = useState<EventInstance[] | []>(
    []
  );
  const { userLocation } = useUserLocation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response: EventInstance[] =
          await fetchInstancesByLocation(userLocation);
        setEventInstances(response);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, [userLocation]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 h-[30%] bg-purple-600 text-2xl text-white p-4 text-center">
        <p>Discover Amazing Events</p>
        <p>
          Browse through our collection of exciting events happening around you
        </p>
      </div>

      <div className="max-w-[70%] mx-auto p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {eventInstances.map((instance) => (
          <EventCard
            key={instance.instance_id}
            event={instance}
            type="instance"
          />
        ))}
      </div>
    </>
  );
}

export default Home;
