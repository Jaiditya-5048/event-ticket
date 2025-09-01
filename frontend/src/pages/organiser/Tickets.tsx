import React, { useState } from 'react';
import { ChevronDown, Edit2, Trash2, Plus } from 'lucide-react';

export default function Tickets() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const events = [
    'Summer Music Festival',
    'Winter Art Exhibition',
    'Tech Innovation Summit 2025',
    'Global Marketing Conference',
    'Wellness Retreat Weekend',
    'Startup Pitch Competition',
    'Culinary Masterclass Series',
  ];

  const tickets = [
    {
      id: 1,
      name: 'Business',
      event: 'Summer Music Festival',
      price: '$3,000.00',
      quantity: 10,
      remaining: 10,
    },
    {
      id: 2,
      name: 'VIP',
      event: 'Winter Art Exhibition',
      price: '$67.00',
      quantity: 50,
      remaining: 50,
    },
  ];

  const filteredTickets = selectedEvent
    ? tickets.filter((ticket) => ticket.event === selectedEvent)
    : tickets;

  const handleEventSelect = (eventName: string) => {
    setSelectedEvent(eventName);
    setDropdownOpen(false);
  };

  const handleCreateTicket = () => {
    console.log('Create ticket clicked');
    alert('Create Ticket functionality would be implemented here');
  };

  const handleEditTicket = (ticketId: number) => {
    console.log('Edit ticket:', ticketId);
    alert(`Edit ticket ${ticketId} functionality would be implemented here`);
  };

  const handleDeleteTicket = (ticketId: number) => {
    console.log('Delete ticket:', ticketId);
    if (confirm('Are you sure you want to delete this ticket?')) {
      alert(
        `Delete ticket ${ticketId} functionality would be implemented here`
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Tickets</h1>
          <button
            onClick={handleCreateTicket}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm font-medium"
          >
            <Plus size={16} />
            Create Ticket
          </button>
        </div>

        {/* Event Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Event
          </label>
          <div className="relative max-w-md">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full px-4 py-3 text-left bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 flex items-center justify-between hover:border-purple-300 transition-colors"
            >
              <span
                className={selectedEvent ? 'text-gray-900' : 'text-gray-500'}
              >
                {selectedEvent || 'Select an event'}
              </span>
              <ChevronDown
                size={20}
                className={`text-purple-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={() => handleEventSelect('')}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 text-gray-700"
                >
                  All Events
                </button>
                {events.map((event) => (
                  <button
                    key={event}
                    onClick={() => handleEventSelect(event)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 text-gray-700 border-t border-gray-100"
                  >
                    {event}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Tickets</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Ticket Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Remaining
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ticket.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {ticket.event}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {ticket.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {ticket.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {ticket.remaining}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditTicket(ticket.id)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      {selectedEvent
                        ? `No tickets found for "${selectedEvent}"`
                        : 'No tickets available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        {filteredTickets.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-2xl font-bold text-purple-600">
                {filteredTickets.length}
              </div>
              <div className="text-sm text-gray-600">Total Ticket Types</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-2xl font-bold text-green-600">
                {filteredTickets.reduce(
                  (sum, ticket) => sum + ticket.quantity,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">Total Tickets</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="text-2xl font-bold text-blue-600">
                {filteredTickets.reduce(
                  (sum, ticket) => sum + ticket.remaining,
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">Remaining Tickets</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
