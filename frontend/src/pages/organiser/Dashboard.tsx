import React from 'react';

export default function DashboardHome() {
  const events = [
    { name: 'Test', date: '20/05/2025' },
    { name: 'Tech Innovation Summit 2025', date: '15/06/2025' },
    { name: 'Summer Music Festival', date: '25/07/2025' },
    { name: 'Global Marketing Conference', date: '10/08/2025' },
    { name: 'Wellness Retreat Weekend', date: '05/09/2025' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Events Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Events</h3>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>

          {/* Tickets Sold Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Tickets Sold
            </h3>
            <p className="text-3xl font-bold text-gray-900">79</p>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">$0.66</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Events Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recent Events
              </h2>

              <div className="space-y-4">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                  >
                    <h3 className="font-medium text-gray-900 mb-1">
                      {event.name}
                    </h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View all events
                </button>
              </div>
            </div>
          </div>

          {/* Organizer Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Organizer Profile
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <p className="text-gray-900">My Organization</p>
                </div>

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors">
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
