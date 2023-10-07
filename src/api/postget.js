import axios from 'axios';

const fetchDataFromApi = async (pagenumb, pageSize) => {
  try {
    const response = await axios.get(`https://localhost:7139/api/Post/Get-all-post-admin?pageNumber=${pagenumb}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export default fetchDataFromApi;