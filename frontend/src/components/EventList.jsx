import { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent } from '../services/eventService';

function EventList() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const response = await fetchEvents();
    setEvents(response.data);
  };

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
    loadEvents();
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="flex justify-between items-center bg-white p-4 rounded-lg mb-4 shadow">
            <div>
              <p className="text-lg font-semibold">{event.name}</p>
              <p className="text-gray-500">
                {event.date} at {event.location} ({event.type})
              </p>
            </div>
            <button
              onClick={() => handleDelete(event.id)}
              className="text-red-500 hover:text-red-700 font-bold transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
