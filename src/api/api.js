import axios from 'axios';
import { API_BASE_URL } from '../constants/URL';

export const getUsers = (currentPage, filterOn, filterQuery) => {
  const queryParams = [];
  if (currentPage !== null && currentPage !== undefined) {
    queryParams.push(`pageNumber=${currentPage}`);
  }
  if (filterOn !== null && filterOn !== undefined) {
    queryParams.push(`filterOn=${filterOn}`);
  }
  if (filterQuery !== null && filterQuery !== undefined) {
    queryParams.push(`filterQuery=${filterQuery}`);
  }
  const queryString = queryParams.join('&');
  return axios.get(
    `${API_BASE_URL}/User/get-all-users?${queryString}&pageSize=5`
  );
};

export const getAll = () => {
  return axios.get(`${API_BASE_URL}/User/get-all`);
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

export const deleteUser = (userId) => {
  return axios.delete(`${API_BASE_URL}/User/delete-user-with-id?id=${userId}`);
};

export const getCategoryData = () => {
  return axios.get(`${API_BASE_URL}/Category/get-all-category`);
}
export const getPostData = (hireState,statusState,minPrice,maxPrice,minArea,maxArea,category,isVip,phoneNumb,address,sortBy,isAscending, pagenumb, pageSize) =>{
  const queryParams = [];
  if (hireState !== null && hireState !== undefined) {
    queryParams.push(`hireState=${hireState}`);
  }

  if (statusState !== null && statusState !== undefined) {
    queryParams.push(`statusState=${statusState}`);
  }

  if (minPrice !== null && minPrice !== undefined) {
    queryParams.push(`minPrice=${minPrice}`);
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    queryParams.push(`maxPrice=${maxPrice}`);
  }

  if (minArea !== null && minArea !== undefined) {
    queryParams.push(`minArea=${minArea}`);
  }

  if (maxArea !== null && maxArea !== undefined) {
    queryParams.push(`maxArea=${maxArea}`);
  }

  if (category !== null && category !== undefined) {
    queryParams.push(`category=${category}`);
  }

  if (isVip !== null && isVip !== undefined) {
    queryParams.push(`isVip=${isVip}`);
  }
  if (phoneNumb !== null && phoneNumb !== undefined) {
    queryParams.push(`phoneNumb=${phoneNumb}`);
  }
  if (address !== null && address !== undefined) {
    queryParams.push(`address=${address}`);
  }

  if (sortBy !== null && sortBy !== undefined) {
    queryParams.push(`sortBy=${sortBy}`);
  }

  if (isAscending !== null && isAscending !== undefined) {
    queryParams.push(`isAscending=${isAscending}`);
  }

  if (pagenumb !== null && pagenumb !== undefined) {
    queryParams.push(`pageNumber=${pagenumb}`);
  }

  if (pageSize !== null && pageSize !== undefined) {
    queryParams.push(`pageSize=${pageSize}`);
  }
  const queryString = queryParams.join('&');
  return axios.get(`${API_BASE_URL}/Post/Get-all-post-admin?${queryString}`);
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
  export const updateTier = (editingTier) => {
    return axios.put(`${API_BASE_URL}/Tiers/update-tier-id?id=${editingTier.id}`, {
      ...editingTier,
    });
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
