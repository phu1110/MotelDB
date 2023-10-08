import axios from 'axios';
import { API_BASE_URL } from '../constants/URL';

export const getUsers = (currentPage) => {
  return axios.get(`${API_BASE_URL}/User/get-all-users?pageNumber=${currentPage}&pageSize=5`);
};

export const getTiers = (currentPage) => {
  return axios.get(`${API_BASE_URL}/Tiers/get-all-tier?pageNumber=${currentPage}&pageSize=5`);
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
  export const updateTier = (editingTier) => {
    return axios.put(`${API_BASE_URL}/Tiers/update-tier-id?id=${editingTier.id}`, {
      ...editingTier,
    });
  };
  export const deleteUser = (userId) => {
    return axios.delete(`${API_BASE_URL}/User/delete-user-with-id?id=${userId}`);
  };
  export const deleteTier = (tierId) => {
    return axios.delete(`${API_BASE_URL}/Tiers/delete-tier-id?id=${tierId}`);
  };
  export const detailUser = (userId) => {
    return axios.get(`${API_BASE_URL}/User/get-user-with-id?id=${userId}`)
  }
  export const detailTier = (tierId) => {
    return axios.get(`${API_BASE_URL}/Tiers/get-tier-id?id=${tierId}`)
  }