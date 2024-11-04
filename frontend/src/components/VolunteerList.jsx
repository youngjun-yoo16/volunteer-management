/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import api from '../services/api';

function VolunteerList({ onVolunteerDeleted }) {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]); // New state to store events
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [formData, setFormData] = useState({
    volunteer_id: '',
    event_id: '',
    hours: '',
  });

  useEffect(() => {
    fetchVolunteers();
    fetchEvents(); // Fetch events when the component loads
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await api.get('/assignments/');
      setVolunteers(response.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events/');
      setEvents(response.data); // Set events in the state
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const deleteVolunteer = async (volunteerId) => {
    try {
      await api.delete(`/assignments/${volunteerId}`);
      fetchVolunteers();
      onVolunteerDeleted();
    } catch (error) {
      console.error('Error deleting volunteer:', error);
    }
  };

  const startEditing = (volunteer) => {
    setEditingVolunteer(volunteer.id);
    setFormData({
      volunteer_id: volunteer.volunteer_id,
      event_id: volunteer.event.id, // Set event ID in form data
      hours: volunteer.hours,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/assignments/${editingVolunteer}`, formData);
      setEditingVolunteer(null); // Close the edit form after saving
      fetchVolunteers();
    } catch (error) {
      console.error('Error updating volunteer assignment:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Volunteer List</h2>

      {/* Volunteer List */}
      {volunteers.length > 0 ? (
        <ul className="space-y-4">
          {volunteers.map((volunteer) => (
            <li key={volunteer.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Volunteer ID: {volunteer.volunteer_id}</p>
                  <p className="text-sm text-gray-500">Event: {volunteer.event.name}</p>
                  <p className="text-sm text-gray-500">Hours Worked: {volunteer.hours}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(volunteer)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteVolunteer(volunteer.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Edit Form - Displayed Directly Below the Selected Volunteer */}
              {editingVolunteer === volunteer.id && (
                <form onSubmit={handleEditSubmit} className="mt-4 p-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-center mb-4">Edit Volunteer Assignment</h3>
                  <div className="mb-4">
                    <label className="block text-gray-700">Volunteer ID</label>    
                    <input
                      type="number"
                      placeholder="Volunteer ID"
                      value={formData.volunteer_id}
                      onChange={(e) => setFormData({ ...formData, volunteer_id: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Event</label>
                    <select
                      value={formData.event_id}
                      onChange={(e) => setFormData({ ...formData, event_id: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      {events.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Hours Worked</label>
                    <input
                      type="number"
                      placeholder="Hours Worked"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
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
        <p className="text-center text-gray-500">No volunteers assigned.</p>
      )}
    </div>
  );
}

export default VolunteerList;
