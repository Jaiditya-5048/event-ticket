import React, { createContext, useContext, useEffect, useState } from 'react';
import { Event } from '@/utils/types/event_types';
import { getAllEventsUnderOrganiser } from '@/apis/services/organiser_apis/event_api';
import { TicketType } from '@/utils/types/api';
import { getAllTicketTypes } from '@/apis/services/organiser_apis/ticket-type_api';

interface EventContextType {
  events: Event[];
  loading: boolean;
  refetch: () => void;
  calculateSeatTotals: (id: number) => {
    total_seats: number;
    available_seats: number;
  };
}

type AllTickets = { instance_id: number; tickets: TicketType[] };

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [ticketType, setTicketType] = useState<AllTickets[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    const data = await getAllEventsUnderOrganiser();
    setEvents(data);
    const ticketData = await getAllTicketTypes();
    setTicketType(ticketData);

    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // function to extract tickets based on instance id and get total seats and available seats
  const calculateSeatTotals = (id: number) => {
    const ticketGroup = ticketType.find((group) => group.instance_id === id);

    if (!ticketGroup) {
      return { total_seats: 0, available_seats: 0 };
    }

    return ticketGroup.tickets.reduce(
      (acc, ticket) => {
        acc.total_seats += Number(ticket.total_seats);
        acc.available_seats += ticket.available_seats;
        return acc;
      },
      { total_seats: 0, available_seats: 0 }
    );
  };

  return (
    <EventContext.Provider
      value={{ events, loading, refetch: fetchEvents, calculateSeatTotals }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
