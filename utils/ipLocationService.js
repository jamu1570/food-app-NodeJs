import axios from 'axios';

export const getLocationByIP = async (ip) => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    return response.data; // contains city, region, country, etc.
  } catch (error) {
    console.error('Failed to fetch IP location:', error.message);
    throw new Error('Unable to fetch location');
  }
};
