import axios from 'axios';

const fetchCategoryFromApi = async () => {
  try {
    const response = await axios.get('https://localhost:7139/api/Category/get-all-category'); // Replace with your API endpoint
    return response.data; // Assuming the API returns an array of data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export default fetchCategoryFromApi;