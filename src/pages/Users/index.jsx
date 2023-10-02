import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import '../styles.css';
// import DoneIcon from '../../assets/icons/done.svg';
// import CancelIcon from '../../assets/icons/cancel.svg';
// import RefundedIcon from '../../assets/icons/refunded.svg';
import axios from 'axios';
function Orders() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, settotalUsers] = useState(0);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const handleEdit = (user) => {
        setEditingUser(user); // Lưu thông tin người dùng đang được chỉnh sửa
        setIsEditing(true); // Hiển thị form sửa thông tin
    };
    const handleCancel = () => {
        setEditingUser(null); // Đặt editingUser về null để xóa dữ liệu chỉnh sửa
        setIsEditing(false); // Tắt chế độ chỉnh sửa
    };
    const handleSave = (event) => {
        event.preventDefault();
        // Gửi yêu cầu cập nhật thông tin người dùng đến API
        axios.put(`https://localhost:7139/api/User/update-userbasic?id=${editingUser.id}`,{...editingUser,
        gender: editingUser.gender === 'true',}, editingUser)
            .then((response) => {
                
                setIsEditing(false);
                toast.success('Thông tin đã được cập nhật', {
                    position: 'top-right',
                    autoClose: 3000, // Đóng thông báo sau 3 giây
                    hideProgressBar: false,
                    style: successToastStyle
                });
                const updatedUsers = users.map((user) =>
                    user.id === editingUser.id ? editingUser : user
                );
                setUsers(updatedUsers);
            })
            .catch((error) => {
                toast.error('Lỗi không sửa được người dùng', {
                    position: 'top-right',
                    autoClose: 3000, // Đóng thông báo sau 3 giây
                    hideProgressBar: false,
                    style: errorToastStyle
                });
            });
    };
    useEffect(() => {    
        axios.get(`https://localhost:7139/api/User/get-all-users?pageNumber=${currentPage}&pageSize=5`)
            .then((response) => {
                const userData = response.data.users;
                setUsers(userData);
                setTotalPages(response.data.totalPages);
                settotalUsers(response.data.total);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentPage]);
    // const handlePageChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };

    const handleDelete = (userId) => {
        // Gửi yêu cầu xóa đến API
        axios.delete(`https://localhost:7139/api/User/delete-user-with-id?id=${userId}`)
            .then((response) => {
                // Xóa thành công, cập nhật lại danh sách người dùng
                const updatedUsers = users.filter((user) => user.id !== userId);
                setUsers(updatedUsers);
                
                console.log('Dữ liệu đã được xóa thành công');
            })
            .catch((error) => {
                console.error('Lỗi khi xóa dữ liệu:', error);
            });
    };
    const __handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearch(searchTerm);
    
        if (searchTerm !== '') {
            let search_results = users.filter((user) =>
                user.lastname.toLowerCase().includes(searchTerm) ||
                user.firstname.toLowerCase().includes(searchTerm) ||
                user.address.toLowerCase().includes(searchTerm)
            );
            setUsers(search_results);
            setTotalPages(1); // Reset total pages when search results change
            setCurrentPage(1); // Reset current page to 1 when search results change
        } else {
            axios.get(`https://localhost:7139/api/User/get-all-users?pageNumber=${currentPage}&pageSize=5`)
            .then((response) => {
                const userData = response.data.users;
                setUsers(userData);
                setTotalPages(response.data.totalPages);
                settotalUsers(response.data.total);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };
    
    const hostUrl = 'https://localhost:7139';
    const successToastStyle = {
        background: '#4CAF50', // Màu nền thành công
        color: 'white', // Màu chữ thành công
      };
      
      const errorToastStyle = {
        background: '#EE0000', // Màu nền lỗi
        color: 'white', // Màu chữ lỗi
      };
      const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
      }
    return (
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="New Order" />

            <div className='dashboard-content-container  relative'>
                <div className='dashboard-content-header'>
                    <h2 className='text-white'>Danh Sách Người Dùng</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Ngày Sinh</th>
                        <th>Địa chỉ</th>
                        <th>Giới tính</th>
                        <th>Số Điện Thoại</th>
                        <th>Vai trò</th>
                        <th>Gói</th>
                    </thead>

                    {users.length !== 0 ?
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td><span>{user.id}</span></td>
                                    <td>
                                        <div>
                                            {user.actualFile && (<img
                                                src={`${hostUrl}/${user.actualFile}`}
                                                className="dashboard-content-avatar "
                                                alt="not found"
                                            />)}
                                            <span>{user.firstname + " " + user.lastname}</span>
                                        </div>
                                    </td>
                                    <td><span>{user.birthday}</span></td>
                                    <td><span>{user.address}</span></td>
                                    <td><span>{user.gender}</span></td>
                                    <td><span>{user.phone}</span></td>
                                    <td><span>{user.rolename}</span></td>
                                    <td><span>{user.tier}</span></td>

                                    <td>
                                        <button className="bg-red-600" onClick={() => handleDelete(user.id)}>
                                            Xóa
                                        </button>
                                    </td>
                                    <td>
                                        <button className="bg-yellow-400" onClick={() => handleEdit(user)}>
                                            sửa
                                        </button>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                        : null}
                </table>
                {isEditing && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="mx-auto w-full max-w-[850px] bg-white p-12 rounded-lg shadow-lg">
                            <form action="https://formbold.com/s/FORM_ID" method="POST">
                                <div className="grid justify-items-end">

                                </div>
                                <div className="-mx-3 flex flex-rows">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label className="mb-3 block text-base font-medium text-[#07074D]">
                                                Họ
                                            </label>
                                            <input
                                                type="text"
                                                value={editingUser.firstname}
                                                onChange={(e) => setEditingUser({ ...editingUser, firstname: e.target.value })}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label className="mb-3 block text-base font-medium text-[#07074D] ">
                                                Tên
                                            </label>
                                            <input
                                                type="text"
                                                value={editingUser.lastname}
                                                onChange={(e) => setEditingUser({ ...editingUser, lastname: e.target.value })}
                                                className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        value={editingUser.address}
                                        onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>

                                <div className="-mx-3 flex flex-col mb-4">
                                    <div className='flex flex-row'>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label className="mb-3 block text-base font-medium text-[#07074D]">
                                                Ngày Sinh
                                            </label>
                                            <input
                                                type="text"
                                                value={editingUser.birthday}
                                                onChange={(e) => setEditingUser({ ...editingUser, birthday: e.target.value })}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label className="mb-3 block text-base font-medium text-[#07074D]">
                                                Số điện thoại
                                            </label>
                                            <input
                                                type="text"
                                                value={editingUser.phone}
                                                onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                        
                                    </div>
                                    </div>
                                    <div className='w-full px-3 sw:w-1/2'>
                                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                                        Giới tính
                                    </label>
                                    <select
                                        value={editingUser.gender.toString()}
                                        onChange={(e) => setEditingUser({ ...editingUser, gender: e.target.value === 'true' })}
                                        className="w-max-[50px] rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    >
                                        <option value="true">Nam</option>
                                        <option value="false">Nữ</option>
                                    </select>
                                    </div>
                                </div>



                                <div className='flex gap-4'>
                                    <button className="hover:shadow-form rounded-md bg-[#3eb15b] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        onClick={handleSave}>
                                        Lưu
                                    </button>
                                    <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        onClick={handleCancel}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                )}
                {/* <div id="pagination">
    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button key={page} onClick={() => handlePageChange(page)}>{page}</button>
    ))}
</div> */}
<ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
      />
            </div>
        </div>
    )
}

export default Orders;
