import api from './api';

export const addAssignment = (assignment) => api.post('/assignments/', assignment);
