import axios from 'axios';
import { API_BASE_URL } from '../constants/URL';

export const getUsers = (currentPage) => {
  return axios.get(`${API_BASE_URL}/User/get-all-users?pageNumber=${currentPage}&pageSize=5`);
};

export const getTiers = () => {
  return axios.get(`${API_BASE_URL}/Tiers/get-all-tier`);
};

export const getRoles = () => {
  return axios.get(`${API_BASE_URL}/Roles/get-all-role`);
};
export const updateUser = (editingUser) => {
    return axios.put(`${API_BASE_URL}/User/update-userbasic?id=${editingUser.id}`, {
      ...editingUser,
      gender: editingUser.gender === 'true',
    });
  };
  
  export const deleteUser = (userId) => {
    return axios.delete(`${API_BASE_URL}/User/delete-user-with-id?id=${userId}`);
  };