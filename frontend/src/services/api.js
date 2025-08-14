// const API_BASE_URL = 'http://localhost:3000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

export const chatApi = {
  sendMessage: async (message, persona) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chai/generate-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, persona }),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  getPersonas: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chai/personas`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching personas:', error);
      throw error;
    }
  },
};
