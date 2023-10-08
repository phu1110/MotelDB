import React, { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { detailUser } from '../../api/api';
import moment from 'moment';
import Dislike from '../../assets/icons/dislike.svg'
import { image } from '../../constants/URL'
function TruncatedText({ text, maxLength }) {
  if (text.length <= maxLength) {
    return (
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {text}
      </td>
    );
  } else {
    const truncatedText = text.slice(0, maxLength) + "...";
    return (
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {truncatedText}
      </td>
    );
  }
}
const DetailsUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await detailUser(id);
        // Lưu thông tin người dùng vào state
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Gọi hàm để lấy chi tiết người dùng khi component được tạo ra
    fetchUserDetails();
  }, [id]); // Chạy lại useEffect khi id thay đổi
  const calculateElapsedTime = (post) => {
    if (post && post.datecreatedroom) {
      const postDate = moment(post.datecreatedroom);
      const currentDate = moment();

      const hoursDiff = currentDate.diff(postDate, 'hours');
      const minutesDiff = currentDate.diff(postDate, 'minutes') % 60;
      const dateDiff = currentDate.diff(postDate, 'hours') % 24 ;
      if (hoursDiff >= 24) {
        // Nếu thời gian trôi qua lớn hơn hoặc bằng 24 giờ, hiển thị ngày đăng
        return `${dateDiff} ngày trước`;
        // return postDate.format('DD/MM/YYYY');
      } else if (hoursDiff > 0) {
        // Nếu thời gian trôi qua dưới 24 giờ, hiển thị số giờ và phút trước đó
        return `${hoursDiff} giờ ${minutesDiff} phút trước`;
      } else {
        // Nếu thời gian trôi qua dưới 1 giờ, chỉ hiển thị số phút trước đó
        return `${minutesDiff} phút trước`;
      }
    }
    
    return 'Không xác định';
  };
  const getImageUrl = (actualFile) => {
    // Check if actualFile is not null before splitting
    if (actualFile && typeof actualFile === 'string') {
      // Xử lý actualFile để đảm bảo định dạng đúng
      const cleanedUrl = actualFile.split(';')[0];
      return `https://localhost:7139/${cleanedUrl}`;
    } else {
      // Handle the case where actualFile is null or not a string
      console.error("Invalid actualFile:", actualFile);
      return ""; // or return a default image URL
    }
  };
  
  return (
    <div>
      <Link to = '/users'> Trở về</Link>
      {userData ? (
        <div className="max-w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Chi tiết người dùng</h2>
  
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Tên:</p>
            <p className="font-semibold">{userData.fullname}</p>
          </div>
  
          <div>
            <p className="text-gray-600">Địa chỉ:</p>
            <p className="font-semibold">{userData.birthday}</p>
          </div>
  
          <div>
            <p className="text-gray-600">Ngày tạo tài khoản:</p>
            <p className="font-semibold">{userData.datecreated}</p>
          </div>
  
          <div>
            <p className="text-gray-600">Giới tính:</p>
            <p className="font-semibold">{userData.gender}</p>
          </div>
  
          <div>
            <p className="text-gray-600">Số điện thoại:</p>
            <p className="font-semibold">{userData.phone}</p>
          </div>
  
          <div>
            <p className="text-gray-600">Vai trò:</p>
            <p className="font-semibold">{userData.rolename}</p>
          </div>
  
          <div>
            <p className="text-gray-600">Gói:</p>
            <p className="font-semibold">{userData.tier}</p>
          </div>
        </div>
        <div style={{ width: '98%', height: '5px', backgroundColor: 'black' }} className="my-6 mx-auto"></div>
          <h2>Tin đã đăng</h2>
          <div>
          {userData.posts && userData.posts.length > 0 ? (
            <div className='grid grid-cols-2 gap-4'>
              {userData.posts.map((post) => (
                <div key={post.id}>
                 
                  
	<div class="  p-4 items-center justify-center w-[680px] rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
  <img
        className="mx-auto w-full block w-4/12 h-40 rounded-lg"
        alt="art cover"
        loading="lazy"
        src={getImageUrl(post.actualFile)}
      />
		<div class="sm:w-8/12 pl-0 p-5">
			<div class="space-y-2">
				<div class="space-y-4">
					<h4 class="text-md font-semibold text-cyan-900 text-justify">
          {post.title}
					</h4>
				</div>
        <div className="flex items-center justify-between gap-2 pl-[2px]">
            <p className="price text-sky-400"> {post.price} VND</p>
            <p className="acreage"> {post.area} m²  </p>
            <p className="address decoration-black-600 hover:decoration-blue-400 cursor-pointer">
            <TruncatedText text={post.address} maxLength={20} />
            </p>
          </div>
				
				<div class="flex items-center space-x-4 justify-between">
					<div class="text-grey-500 flex flex-row space-x-1  my-4">
						<svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						<p class="text-xs">{calculateElapsedTime(post)}</p>
					</div>
					<div class="flex flex-row space-x-1">
						
            <div>
              {post.status === 'Đang chờ duyệt' ?
              <div
							class="bg-red-500 shadow-lg shadow- shadow-red-600 text-white cursor-pointer px-3 py-1 text-center justify-center items-center rounded-xl flex space-x-2 flex-row">
							<img src={Dislike} alt='like-icon' style={{ fill: 'white' }}></img>
							<span>{post.status}</span>
						</div>
              : post.status === 'Đã Duyệt' ?
              <div
							class="bg-green-500 shadow-lg shadow- shadow-green-600 text-white cursor-pointer px-3 text-center justify-center items-center py-1 rounded-xl flex space-x-2 flex-row">
	
							<span>23</span>
						</div>
            : post.status === 'Hết Hạn' ?
            <div
            class="bg-gray-500 shadow-lg shadow- shadow-gray-600 text-black cursor-pointer px-3 text-center justify-center items-center py-1 rounded-xl flex space-x-2 flex-row">

            <span>23</span>
          </div> : null}
            </div>
					</div>
				</div>
			</div>
		</div>
	</div>

                </div>
              ))}
            </div>
          ) : (
            <p>No posts available for this user.</p>
          )}
          </div>
        </div>
        
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default DetailsUser;
