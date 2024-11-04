/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import api from '../services/api';

function EventList({ onEventUpdated }) {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    type: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events/');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const startEditing = (event) => {
    setEditingEvent(event.id);
    setFormData({
      name: event.name,
      date: event.date,
      location: event.location,
      type: event.type,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/events/${editingEvent}`, formData);
      setEditingEvent(null);
      fetchEvents();
      onEventUpdated();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Event List</h2>

      {/* Event List */}
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-sm text-gray-500">{event.date} at {event.location} ({event.type})</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(event)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Edit Form - Displayed Directly Below the Selected Event */}
              {editingEvent === event.id && (
                <form onSubmit={handleEditSubmit} className="mt-4 p-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-center mb-4">Edit Event</h3>
                  <div className="mb-4">
                    <label className="block text-gray-700">Event Name</label>
                    <input
                      type="text"
                      placeholder="Event Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Event Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Event Location</label>
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Event Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Select Event Type</option>
                      <option value="Cleanup">Cleanup</option>
                      <option value="Fundraising">Fundraising</option>
                      <option value="Environmental">Environmental</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No events available.</p>
      )}
    </div>
  );
}

export default EventList;
