/* eslint-disable react/prop-types */
import { useState } from 'react';
import { addEvent } from '../services/eventService';
import { toast } from 'react-toastify';

function EventForm({ onEventAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    type: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent(formData);
      toast.success("Event added successfully!");
      onEventAdded();
      setFormData({ name: '', date: '', location: '', type: '' });
    } catch (error) {
      toast.error("Failed to add event. " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Event</h2>
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
          <option value="">Select an Event Type</option>
          <option value="Cleanup">Cleanup</option>
          <option value="Fundraising">Fundraising</option>
          <option value="Environmental">Environmental</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
        Add Event
      </button>
    </form>
  );
}

export default EventForm;
