import { TicketType } from "./api";

export interface Event {
  event_id: number;
  name: string;
  description: string;

  EventInstances: {
    instance_id: number;
    date_time: string;
    Venue: {
      venue_id: number;
      name: string;
      address: string;
      city: string;
    };
  }[];

  Category: {
    category_id: number;
    name: string;
  };
}


export interface EventDetails extends Event {
  date: string[];
  location: string;
  price: number | string;
}


export interface Venue {
  venue_id: number;
  name: string;
  address: string;
  city: string;
}

export interface Category {
  category_id: number;
  name: string;
}

export interface Artist {
  artist_id: number;
  name: string;
}

//Final eventInstance type also used in api
export interface EventInstance {
  instance_id: number;
  event_id: number;
  venue_id: number;
  date_time: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  Venue: Venue;
  Event: {
    name: string;
    description: string;
    Category: Category;
  };
  Artists: Artist[];
  TicketTypes: TicketType[];
}

// export interface TicketType {
//   ticket_type_id: number;
//   instance_id: number;
//   name: string;
//   price: number;
//   total_seats: number;
//   available_seats: number;
//   createdAt: string;
//   updatedAt: string;
// }
