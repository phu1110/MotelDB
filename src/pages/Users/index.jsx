import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { toast } from 'react-toastify';
import '../styles.css';
import { getUsers, getTiers, getRoles, updateUser, deleteUser } from '../../api/api';
import axios from 'axios';
import ConfirmationModal from '../../components/Users/ConfirmationModal'
import UserList from '../../components/Users/UserList'
import UserForm from '../../components/Users/UserForm'
import Pagination from '../../components/Users/Pagination'
import { debounce } from 'lodash';
import { CSVLink } from 'react-csv';
function Users() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // const [totalUsers, settotalUsers] = useState(0);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [roles, setRoles] = useState([]);
    const [tiers, setTiers] = useState([]);
    const [filterOn, setFilterOn] = useState('');
    const [filterQuery, setFilterQuery] = useState('');
    const [DataExport, setDataExport] = useState([]);
    const handleEdit = (user) => {
        setEditingUser(user);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditingUser(null);
        setIsEditing(false);
    };
    const handleSave = async (event) => {
        event.preventDefault();
        try {
            await updateUser({
                ...editingUser,
                gender: editingUser.gender === 'true',
            });
            setIsEditing(false);
            toast.success('Thông tin đã được cập nhật', {
                position: 'top-right',
                autoClose: 3000, // Đóng thông báo sau 3 giây
                hideProgressBar: false,

            });
            const updatedUsers = users.map((user) =>
                user.id === editingUser.id ? editingUser : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            toast.error('Lỗi không sửa được người dùng', {
                position: 'top-right',
                autoClose: 3000, // Đóng thông báo sau 3 giây
                hideProgressBar: false,
            });
        }
    };
    const fetchData = async () => {
        try {
            const userResponse = await getUsers(currentPage, filterOn, filterQuery);
            setUsers(userResponse.data.users);
            setTotalPages(userResponse.data.totalPages);

            const tierResponse = await getTiers(currentPage);
            setTiers(tierResponse.data.tiers);
            // setTotalPages(tierResponse.data.totalPages);
            const roleResponse = await getRoles();
            setRoles(roleResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, filterOn, filterQuery]);
    const handleDelete = (userId) => {
        // Hiển thị toast để xác nhận trước khi xóa
        toast.info(
            <ConfirmationModal
                handleDeleteConfirmed={() => handleDeleteConfirmed(userId)}
                hideToast={hideToast}
            />,
            {
                position: 'top-right',
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        );
    };

    const handleDeleteConfirmed = async (userId) => {
        // Gửi yêu cầu xóa đến API
        try {
            await deleteUser(userId);
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);

            toast.success('Xóa dữ liệu thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        } catch (error) {
            toast.error('Xóa dữ liệu không thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };
    const hideToast = () => {
        // Ẩn toast nếu người dùng hủy bỏ
        toast.dismiss();
    };
    const __handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearch(searchTerm);

        if (searchTerm !== '') {
            // Gọi API filter từ phía backend
            axios.get(`https://localhost:7139/api/User/get-all-users?pageNumber=${currentPage}&pageSize=5&filterOn=firstname&filterQuery=${searchTerm}`)
                .then((response) => {
                    const userData = response.data.users;
                    setUsers(userData);
                    setTotalPages(response.data.totalPages);
                    setCurrentPage(1); // Reset current page to 1 when search results change
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Nếu không có giá trị tìm kiếm, gọi API để lấy tất cả dữ liệu
            fetchData();
        }
    };

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    }
    const getUsersExport = async (event, done) => {
        let results = [];

        try {
            if (users && users.length > 0) {
                results.push(["ID", "Tên", "Họ", "Ngày Sinh", "Địa chỉ", "Giới tính", "Số điện thoại", "Vai Trò", "Gói sử dụng"]);
                users.forEach((user) => {
                    let arr = [];
                    arr[0] = user.id;
                    arr[1] = user.firstname;
                    arr[2] = user.lastname;
                    arr[3] = user.birthday;
                    arr[4] = user.address;
                    arr[5] = user.gender ? 'Nam' : 'Nữ';
                    arr[6] = user.phone;
                    arr[7] = user.rolename;
                    arr[8] = user.tier;
                    results.push(arr);
                });

                setDataExport(results);
                done();
            }
        } catch (error) {
            console.error("Error exporting CSV:", error);
            done();
        }
    };

    return (
        <div className='dashboard-content'>
            <DashboardHeader btnText={'Thêm người dùng'} />

            <div className='dashboard-content-container  relative'>

                <div className='dashboard-content-header'>
                    <h2 className='text-black'>Danh Sách Người Dùng</h2>
                    <CSVLink
                        data={DataExport}
                        filename={"users.csv"}
                        className="btn bg-green-400"
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >
                        <i class="fa-solid fa-download"></i> Tải xuống
                    </CSVLink>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='tìm kiếm..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>

                </div>

                <UserList users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
                <UserForm
                    editingUser={editingUser}
                    isEditing={isEditing}
                    setEditingUser={setEditingUser}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    roles={roles}
                    tiers={tiers}
                />
                <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
            </div>
        </div>
    )
}

export default Users;
