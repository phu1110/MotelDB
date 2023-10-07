import React from 'react';
import {image} from '../../constants/URL'
function UserList({ users, handleEdit, handleDelete }) {
    if (!users || users.length === 0) {
        return ('');
      }
    
  return (
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
        <th>Xóa</th>
        <th>Sửa</th>
    </thead>
        <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                    <td><span>{user.id}</span></td>
                    <td>
                        <div>
                            {user.actualFile && (<img
                                src={`${image}/${user.actualFile}`}
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
</table>
  );
}

export default UserList;