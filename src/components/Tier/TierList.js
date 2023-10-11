import React,{useState} from 'react';
import { image } from '../../constants/URL'
import { Link } from 'react-router-dom';
function TierList({ tiers, handleEdit, handleDelete }) {
    const [loadingapi, setLoadingAPI] = useState(true);
    if (!tiers || tiers.length === 0) {
        return <div className="flex items-center justify-center">
            {loadingapi &&  <i className="fas fa-circle-notch fa-spin"></i> }
        </div>;
    }
    return (
        <table>
            <thead>

                <th>ID</th>
                <th>Tên</th>
                <th>Tổng người dùng</th>
                <th>Xóa</th>
                <th>Sửa</th>
                <th>Chi tiết</th>
            </thead>
            <tbody>
                {tiers.map((tier, index) => (
                    <tr key={index}>
                        <td><span>{tier.id}</span></td>
                        <td><span>{tier.tiername}</span></td>
                        <td><span>{tier.users.length}</span></td>

                        <td>
                            <button className="bg-red-600" onClick={() => handleDelete(tier.id)}>
                                Xóa
                            </button>
                        </td>
                        <td>
                            <button className="bg-yellow-400" onClick={() => handleEdit(tier)}>
                                sửa
                            </button>
                        </td>
                        <td>
                            <Link to={`/tier/${tier.id}`}>
                            <button className="bg-gray-400 text-black" >
                                Chi tiết
                            </button>
                            </Link>
                        </td>


                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TierList;