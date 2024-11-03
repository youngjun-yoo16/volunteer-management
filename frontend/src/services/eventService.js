import api from './api';

export const fetchEvents = () => api.get('/events/');
export const addEvent = (event) => api.post('/events/', event);
export const deleteEvent = (eventId) => api.delete(`/events/${eventId}`);
