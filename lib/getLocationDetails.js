import axios from "axios";

const getLocationDetails = async (lat, long) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.EXPO_PUBLIC_OPENCAGE_API_KEY}`;
    const response = await axios.get(url);
    return response.data.results[0].components;
}