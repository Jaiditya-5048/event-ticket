import React from 'react';
import { EventInstance } from '../utils/types/event_types';
import { Link } from 'react-router-dom';

interface IconProps {
  img: string;
  eventInstance: EventInstance;
  closeModal: () => void;
}

function SearchIconCard({ eventInstance, img, closeModal }: IconProps) {
  return (
    <Link to={`/event/${eventInstance.event_id}`} onClick={closeModal}>
      <div className="p-4 border rounded-md flex items-center gap-4 shadow-sm">
        <img
          src={img}
          alt={eventInstance.Event.name}
          className="w-10 h-10 object-cover rounded"
        />
        <div>
          <h4 className="text-sm font-semibold">{eventInstance.Event.name}</h4>
          <p className="text-xs text-gray-600">
            {eventInstance.Event.Category.name}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SearchIconCard;
