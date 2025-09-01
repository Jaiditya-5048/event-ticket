import { getAllArtists } from '@/apis/services/organiser_apis/artists_api';
import { getAllVenue } from '@/apis/services/organiser_apis/venue_api';
import { ArtistsApi, VenueApi } from '@/utils/types/api';
import { Event } from '@/utils/types/event_types';
import { createContext, useContext, useState, useEffect } from 'react';
import * as yup from 'yup';

interface TicketType {
  name: string;
  price: number;
  quantity: number;
}

interface EventInstance {
  date: string;
  time: string;
  venue: string;
  artists: string[];
  ticketTypes: TicketType[];
}

interface FormData {
  name: string;
  description: string;
  category: string;
  instances: EventInstance[];
}

const defaultFormData: FormData = {
  name: '',
  description: '',
  category: '',
  instances: [],
};

const defaultInstance: EventInstance = {
  date: '',
  time: '',
  venue: '',
  artists: [],
  ticketTypes: [],
};

const defaultevent: Event = {
  event_id: 0,
  name: '',
  description: '',
  EventInstances: [{
    instance_id: 0,
    date_time: '',
    Venue: {
      venue_id: 0,
      name: '',
      address: '',
      city: '',
    },
  }],
  Category: {
    category_id: 0,
    name: '',
  },
}

interface EventFormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  currentInstance: EventInstance;
  setCurrentInstance: React.Dispatch<React.SetStateAction<EventInstance>>;
  addInstance: () => void;
  addTicketType: () => void;
  updateTicketType: (
    index: number,
    field: keyof TicketType,
    value: any
  ) => void;
  removeTicketType: (index: number) => void;
  validateForm: () => Promise<{ isValid: boolean }>;
  resetForm: () => void;
  venuesList: VenueApi[];
  artistsList: ArtistsApi[];
  fetchVenues: () => Promise<void>;
  fetchArtists: () => Promise<void>;
  event: Event;
  setEvent: React.Dispatch<React.SetStateAction<Event>>;
}

const EventFormContext = createContext<EventFormContextType | undefined>(
  undefined
);

export const EventFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [event, setEvent] = useState<Event>(defaultevent);
  const [currentInstance, setCurrentInstance] =
    useState<EventInstance>(defaultInstance);

  const [venuesList, setVenuesList] = useState<VenueApi[]>([]);
  const [artistsList, setArtistsList] = useState<ArtistsApi[]>([]);

  const fetchVenues = async () => {
    const data1 = await getAllVenue();
    const data = [
      { id: '1', name: 'Venue A' },
      { id: '2', name: 'Venue B' },
    ];
    setVenuesList(data1);
  };

  const fetchArtists = async () => {
    const data1 = await getAllArtists()
    const data = [
      { id: '1', name: 'Artist A' },
      { id: '2', name: 'Artist B' },
    ];
    setArtistsList(data1);
  };

  useEffect(() => {
    fetchVenues();
    fetchArtists();
  }, []);


  const addInstance = () => {
    setFormData((prev) => ({
      ...prev,
      instances: [...prev.instances, currentInstance],
    }));
    setCurrentInstance(defaultInstance);
  };

  const addTicketType = () => {
    setCurrentInstance((prev) => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, { name: '', price: 0, quantity: 0 }],
    }));
  };

  const updateTicketType = (
    index: number,
    field: keyof TicketType,
    value: any
  ) => {
    setCurrentInstance((prev) => {
      const updated = [...prev.ticketTypes];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, ticketTypes: updated };
    });
  };

  const removeTicketType = (index: number) => {
    setCurrentInstance((prev) => {
      const updated = prev.ticketTypes.filter((_, i) => i !== index);
      return { ...prev, ticketTypes: updated };
    });
  };

  const validateForm = async () => {
    const schema = yup.object({
      name: yup.string().required(),
      description: yup.string().required(),
      category: yup.string().required(),
      instances: yup
        .array()
        .of(
          yup.object({
            date: yup.string().required(),
            time: yup.string().required(),
            venue: yup.string().required(),
            artists: yup.array().of(yup.string().required()),
            ticketTypes: yup
              .array()
              .of(
                yup.object({
                  name: yup.string().required(),
                  price: yup.number().min(0).required(),
                  quantity: yup.number().min(1).required(),
                })
              )
              .required(),
          })
        )
        .min(1),
    });

    try {
      await schema.validate(formData, { abortEarly: false });
      return { isValid: true };
    } catch (error) {
      console.error(error);
      return { isValid: false };
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setCurrentInstance(defaultInstance);
  };

  return (
    <EventFormContext.Provider
      value={{
        formData,
        setFormData,
        currentInstance,
        setCurrentInstance,
        addInstance,
        addTicketType,
        updateTicketType,
        removeTicketType,
        validateForm,
        resetForm,
        venuesList,
        artistsList,
        fetchVenues,
        fetchArtists,
        event,
        setEvent,
      }}
    >
      {children}
    </EventFormContext.Provider>
  );
};

export const useEventForm = () => {
  const context = useContext(EventFormContext);
  if (!context)
    throw new Error('useEventForm must be used within EventFormProvider');
  return context;
};
