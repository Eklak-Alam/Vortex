import api from '@/lib/axios';

export const taskService = {
  getAll: async () => {
    const { data } = await api.get('/tasks');
    return data.data; 
  },

  getById: async (id) => {
    const { data } = await api.get(`/tasks/${id}`);
    return data.data;
  },

  create: async (taskData) => {
    const { data } = await api.post('/tasks', taskData);
    return data.data;
  },

  update: async (id, taskData) => {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    return data.data;
  },

  delete: async (id) => {
    // We don't need the data back for delete, just confirmation
    return api.delete(`/tasks/${id}`);
  }
};