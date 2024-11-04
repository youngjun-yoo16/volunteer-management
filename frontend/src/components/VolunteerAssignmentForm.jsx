/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { fetchEvents } from '../services/eventService';
import { addAssignment } from '../services/assignmentService';
import { toast } from 'react-toastify';

function VolunteerAssignmentForm({ onAssignmentAdded }) {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    event_id: '',
    volunteer_id: '',
    hours: '',
  });

  useEffect(() => {
    const loadEvents = async () => {
      const response = await fetchEvents();
      setEvents(response.data);
    };
    loadEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAssignment(formData);
      toast.success("Volunteer assigned successfully!");
      onAssignmentAdded();
      setFormData({ event_id: '', volunteer_id: '', hours: '' });
    } catch (error) {
      toast.error("Failed to assign volunteer. " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Assign Volunteer</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Event</label>
        <select
          value={formData.event_id}
          onChange={(e) => setFormData({ ...formData, event_id: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Volunteer ID</label>
        <input
          type="number"
          placeholder="Volunteer ID"
          value={formData.volunteer_id}
          onChange={(e) => setFormData({ ...formData, volunteer_id: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Hours Worked</label>
        <input
          type="number"
          placeholder="Hours Worked"
          value={formData.hours}
          onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Assign Volunteer
      </button>
    </form>
  );
}

export default VolunteerAssignmentForm;
