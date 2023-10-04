import axios from 'axios';

const updateData = async (id, {title, description, address, price, area, status, isHire}) => {
  try {
    const response = await axios.put(`https://localhost:7139/api/Post/update-basic/?id=${id}`, {
      title: title,
      description : description,
      address : address,
      price : price,
      area : area,
      status : status,
      isHire : isHire,
      adminId:11,
      categoryids : [1],
    });
    console.log('Data updated:', response.data);
    // Handle success (e.g., show a success message)
  } catch (error) {
    console.error('Error updating data:', error);
    // Handle error (e.g., show an error message)
  }
};
export default updateData;