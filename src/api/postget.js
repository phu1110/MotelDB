import axios from 'axios';

const fetchDataFromApi = async () => {
  try {
    const response = await axios.get('https://localhost:7139/api/Post/Get-all-post-admin'); // Replace with your API endpoint
    return response.data; // Assuming the API returns an array of data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export default fetchDataFromApi;