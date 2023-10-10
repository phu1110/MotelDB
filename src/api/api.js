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

export const getCategoryData = () => {
  return axios.get(`${API_BASE_URL}/Category/get-all-category`);
}
export const getPostData = (pagenumb, pageSize) =>{
  return axios.get(`${API_BASE_URL}/Post/Get-all-post-admin?pageNumber=${pagenumb}&pageSize=${pageSize}`);
}
export const putPost = (id, {title, description, address, price, area, status, isHire, categoryids})  =>{
  return axios.put(`${API_BASE_URL}/Post/update-basic/?id=${id}`, {
    title: title,
    description : description,
    address : address,
    price : price,
    area : area,
    status : status,
    isHire : isHire,
    categoryids : categoryids,
  });
}
export const putUserRole = (userids, roleid) => {
  return axios.put(`${API_BASE_URL}/User/update-role-user`, {
    userids: userids,
    roleid : roleid
  })
}
export const putApprovePost = (id, {userAdminId,status,reason,dateApproved}) => {
  return axios.put(`${API_BASE_URL}/Post/post-approve?id=${id}`, {
    userAdminId: userAdminId,
    status : status,
    reason: reason,
    dateApproved : dateApproved
  })
}
export const deletePost = (id) => {
  return axios.delete(`${API_BASE_URL}/Post/delete-post-with-id/?id=${id}`);
};

export const getUserRole = (pagenumb, pageSize) => {
  return axios.get(`${API_BASE_URL}/User/get-role-users?pageNumber=${pagenumb}&pageSize=${pageSize}`);
};