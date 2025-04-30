import { getLocationByIP } from '../utils/ipLocationService.js';

export const getLocation = async (req, res) => {
    const ip = "192.168.31.205";
  try {
    const location = await getLocationByIP(ip);
    
    // Example operation: personalize greeting
    const greeting = `Hello from ${location.city}, ${location.country_name}!`;

    res.status(200).json({ message: greeting, location });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Could not determine location' });
  }
}