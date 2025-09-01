import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Event, EventInstance } from '../../utils/types/event_types';
import { EventBookingModal } from '../../components/modals/EventBookingModal';
import {
  getAllEventInstacesById,
  getEventById,
} from '../../apis/services/event_api';
import EventCard from '../../components/EventCard';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatDateTime';

function EventDetails() {
  const { id } = useParams(); // <-- event ID from URL
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [eventInstances, setEventInstances] = useState<EventInstance[] | []>(
    []
  );
  const [selectedEvent, setSelectedEvent] = useState<EventInstance | null>(
    null
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    // Fetch event details and instances when the component mounts or when `id` changes
    const fetchEvent = async () => {
      try {
        const responseEvent = await getEventById(id);
        console.log('Single event using ID', responseEvent);
        setEvent(responseEvent);
        const responseEeventInstace = await getAllEventInstacesById(id);
        console.log('all event instances using ID', responseEeventInstace);
        setEventInstances(responseEeventInstace);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  //LOADING STATE
  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading event details...</p>
      </div>
    );
  }

  //Funtion to handle booking tickets
  //If user is logged in, set the selected event instance to the state
  //If not logged in, redirect to login page
  const handleBookTicketsBtn = () => {
    if (user) {
      setSelectedEvent(eventInstances[0]);
    } else {
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  return (
    <>
      <div className="bg-purple-600 min-h-[40%] mx-auto flex items-center justify-center">
        <div className="flex items-center justify-around gap-5 max-w-[70%] text-2xl text-white p-4">
          <div className="flex flex-col gap-2">
            <p className="text-6xl">{event.name}</p>

            <p>
              {event.EventInstances.length > 1 ?
                  ' From - ' + formatDate(event.EventInstances[0].date_time)
                  // formatDate(
                  //   event.EventInstances[event.EventInstances.length - 1]
                  //     .date_time
                  // )
                : formatDate(event.EventInstances[0].date_time)}
            </p>
            <p>{event.description}</p>
            {event.EventInstances.length > 1 ? (
              <div></div>
            ) : (
              <input
                type="button"
                value="Book Tickets"
                onClick={handleBookTicketsBtn}
                className="bg-amber-50 p-2 rounded-lg text-purple-600 cursor-pointer hover:bg-purple-200"
              />
            )}
          </div>
          <img
            src="../../public/components/event_card_pic.jpeg"
            alt=""
            className="w-[30%] overflow-hidden rounded-lg shadow-lg"
          />
        </div>

        <div></div>

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
      {eventInstances.length < 2 ? (
        <div></div>
      ) : (
        <div className="max-w-[70%] mx-auto p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {eventInstances.map((instance) => (
            <EventCard
              key={instance.instance_id}
              event={instance}
              type="instance"
            />
          ))}
        </div>
      )}
    </>
  );
}

export default EventDetails;
