import { getEventInstanceById } from '@/apis/services/instance_api';
import { EventInstance } from '@/utils/types/event_types';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useEventContext } from '@/context/EventContext';
import { formatDate, formatTime } from '@/utils/formatDateTime';
import { getAllEventInstacesById } from '@/apis/services/event_api';
import { FaTags } from 'react-icons/fa';
import EditOptionsMenu from '@/components/modals/EditOptionsMenu';
import { TicketType } from '@/utils/types/api';
import { deleteTicketType } from '@/apis/services/organiser_apis/ticket-type_api';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instances, setInstances] = useState<EventInstance[]>();
  const [openEvents, setOpenEvents] = useState<string[]>([]);
  const [openEditDD, setOpenEditDD] = useState<string | null>(null); // store instance_id

  // Collapsible logic
  const toggleEvent = (event_id: string) => {
    setOpenEvents((prev) =>
      prev.includes(event_id)
        ? prev.filter((id) => id !== event_id)
        : [...prev, event_id]
    );
  };

  const fetchInstances = async () => {
    if (!id) return navigate('/dashboard');
    try {
      const response = await getAllEventInstacesById(id);
      setInstances(response);
    } catch (error) {
      console.error('Failed to fetch Instance:', error);
    }
  };

  useEffect(() => {
    fetchInstances();
  }, [id, navigate]);

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

  const handleTicketTypeDelete = async (ticketType: TicketType) => {
    await deleteTicketType(ticketType.ticket_type_id);
    fetchInstances();
  }

  if (!instances) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <div className="mb-5">
        <p className="text-4xl">Event Details</p>
      </div>

      {/* Event basic details */}
      <div className="p-5">
        <div className="flex flex-col gap-2">
          <p className="text-2xl">
            <span className="text-muted-foreground">Event name:</span>{' '}
            {instances[0].Event.name}
          </p>
          <div className="text-2xl">
            <Badge
              className={getCategoryColor(instances[0].Event.Category.name)}
            >
              {instances[0].Event.Category.name}
            </Badge>
          </div>
          <p className="text-2xl">{instances[0].Event.description}</p>
        </div>
      </div>

      {/* Event Instances */}
      <div className="space-y-4">
        {instances.map((instance) => {
          const isOpen = openEvents.includes(instance.instance_id.toString());
          const totalTicketTypes = instance.TicketTypes.length;

          return (
            <Card
              key={instance.instance_id}
              className="bg-gradient-card shadow-card border-0"
            >
              <Collapsible
                open={isOpen}
                onOpenChange={() =>
                  toggleEvent(instance.instance_id.toString())
                }
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-[var(--accent)]/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {isOpen ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <div>
                          <CardTitle className="text-xl">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {formatDate(instance.date_time)} at{' '}
                                {formatTime(instance.date_time)}
                              </span>
                            </div>
                          </CardTitle>
                          <CardDescription className="mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {instance.Venue.name +
                                  ', ' +
                                  instance.Venue.address +
                                  ', ' +
                                  instance.Venue.city}
                              </span>
                            </div>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* artist and ticket count */}
                        <div className="text-muted-foreground">
                          <p>
                            {instance.Artists.map((art) => art.name).join(', ')}
                          </p>
                          <p>{totalTicketTypes} Ticket types</p>
                        </div>

                        {/* edit/delete buttons */}
                        <div className="flex gap-2">
                          <EditOptionsMenu
                            onDateTime={() => console.log('Edit Date & Time')}
                            onVenue={() => console.log('Edit Venue')}
                            onArtist={() => console.log('Edit Artist')}
                          />

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                {/* Ticket types */}
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Ticket Types
                      </h4>
                      {instance.TicketTypes.map((ticketType) => (
                        <div
                          key={ticketType.ticket_type_id}
                          className="p-4 rounded-lg bg-background/60 border"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="flex flex-col gap-1 text-sm">
                                <p className="text-lg">{ticketType.name}</p>
                                <div className="flex items-center gap-1">
                                  <FaTags className="h-4 w-4 text-muted-foreground" />
                                  <span>{ticketType.price}</span>
                                </div>
                                <p>
                                  <span className="text-muted-foreground">
                                    Total seats:{' '}
                                  </span>
                                  {ticketType.total_seats}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">
                                    Available seats:{' '}
                                  </span>
                                  {ticketType.available_seats}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right text-sm">
                                <p>
                                  <span className="text-muted-foreground">
                                    tickets sold:{' '}
                                  </span>
                                  {Number(ticketType.total_seats) -
                                    ticketType.available_seats}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2
                                    className="h-3 w-3 text-destructive"
                                    onClick={() => handleTicketTypeDelete(ticketType)}
                                  />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default EventDetails;
