import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Plus,
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useEventContext } from '@/context/EventContext';
import { formatDate, formatTime } from '@/utils/formatDateTime';
import InstanceModal from '@/components/modals/InstanceModal';
import { Link } from 'react-router-dom';
import { Event, EventInstance } from '@/utils/types/event_types';
import EditEventModal from '@/components/modals/EditEventModal';
import { deleteEvent } from '@/apis/services/organiser_apis/event_api';

const MockEvent = {
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

interface MockInstance {
  id: string;
  date: string;
  time: string;
  venue: string;
  artists: string[];
  ticketsSold: number;
  totalTickets: number;
}

const Events = () => {
  const { events, loading, calculateSeatTotals, refetch } = useEventContext();
  const [openEvents, setOpenEvents] = useState<string[]>([]);
  const [editEventOpen, setEditEventOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<Event>(MockEvent);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editValues, setEditValues] = useState<any>(null);

  const toggleEvent = (event_id: string) => {
    setOpenEvents((prev) =>
      prev.includes(event_id)
        ? prev.filter((id) => id !== event_id)
        : [...prev, event_id]
    );
  };

  const handleAdd = () => {
    setModalMode('add');
    setEditValues(null);
    setModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditEvent(event);
    setEditEventOpen(true);    
  };

  const handleDeleteEvent = async (event: Event) => {
    await deleteEvent((event.event_id).toString());
    refetch();
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Music: 'bg-blue-100 text-blue-800',
      Technology: 'bg-green-100 text-green-800',
      Art: 'bg-purple-100 text-purple-800',
      Food: 'bg-orange-100 text-orange-800',
    };
    return (
      colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    );
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            Manage all your events and their instances
          </p>
        </div>
        <Link to="/dashboard/new-event">
          <Button variant="gradient" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {events.map((event) => {
          const isOpen = openEvents.includes(event.event_id.toString());
          const totalInstances = event.EventInstances.length;
          return (
            <Card
              key={event.event_id}
              className="bg-gradient-card shadow-card border-0"
            >
              <Collapsible
                open={isOpen}
                onOpenChange={() => toggleEvent(event.event_id.toString())}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-accent/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <div>
                          <CardTitle className="text-xl">
                            {event.name}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {event.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={getCategoryColor(event.Category.name)}
                        >
                          {event.Category.name}
                        </Badge>
                        <div className="text-right text-sm">
                          <p className="font-medium">
                            {totalInstances} instances
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditEvent(event)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteEvent(event)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Event Instances
                      </h4>
                      {event.EventInstances.map((instance) => {
                        const { total_seats, available_seats } =
                          calculateSeatTotals(instance.instance_id);

                        return (
                          <Link
                            to={`/dashboard/events/${instance.instance_id}`}
                          >
                            <div
                              key={instance.instance_id}
                              className="mb-4 p-4 rounded-lg bg-background/60 border"
                            >
                              <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                      <span>
                                        {formatDate(instance.date_time)} at{' '}
                                        {formatTime(instance.date_time)}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4 text-muted-foreground" />
                                      <span>{instance.Venue.name}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-right text-sm">
                                    <p className="font-medium">
                                      {total_seats - available_seats} /{' '}
                                      {total_seats}
                                    </p>
                                    <p className="text-muted-foreground">
                                      tickets sold
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    {/* <Button variant="outline" size="sm">
                                      <Edit className="h-3 w-3" />
                                      Edit
                                    </Button> */}
                                    <Button variant="outline" size="sm">
                                      <Trash2 className="h-3 w-3 text-destructive" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
      <InstanceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        defaultValues={editValues || {}}
      />
      <EditEventModal
        open={editEventOpen}
        onOpenChange={setEditEventOpen}
        event={editEvent}
        // fetchEvents={fetchEvents}
      />
    </div>
  );
};

export default Events;
