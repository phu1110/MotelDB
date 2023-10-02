import React, { useState } from 'react'
import axios from 'axios';
const Login = () => {
    const [phone, setPhone] = useState("");
    const [password,setPassword] = useState("");
    const loginapi = (phone,password) => {  
        return axios.post('https://localhost:7139/api/Login',{phone,password});
    }
    const handleLogin = async () => {
        alert("Waiting for"); 

  try {
    // Gọi hàm loginapi và đợi kết quả
    const response = await loginapi(phone, password);

    // Lấy token từ response
    const token = response.data.token;

    // Lưu token vào Local Storage
    localStorage.setItem('token', token);

    // In ra console để kiểm tra
    console.log("Login successful. Token:", token);
  } catch (error) {
    // Xử lý lỗi, ví dụ:
    console.error("Login failed:", error.message);
  }
    };
    return (
       <div className="bg-no-repeat bg-cover bg-center relative" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80)'}}><div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0" />
  <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
    <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
      <div className="self-start hidden lg:flex flex-col  text-white">
        <img src className="mb-3" />
        <h1 className="mb-3 font-bold text-5xl">Chào mừng trở lại </h1>
        
      </div>
    </div>
    <div className="flex justify-center self-center  z-10">
      <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
        <div className="mb-4">
          <h3 className="font-semibold text-2xl text-gray-800">Đăng Nhập </h3>
          <p className="text-gray-500">Vui lòng đăng nhập tài khoản của bạn</p>
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 tracking-wide">Số Điện Thoại</label>
            <input className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type placeholder="079......" 
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className=" text-sm font-medium text-gray-700 tracking-wide">
              Mật khẩu
            </label>
            <input className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type='password' placeholder="Nhập mật khẩu của bạn" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-800">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-green-400 hover:text-green-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
            onClick={() => handleLogin()}>
              Đăng nhập
            </button>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</div>

    )
}

export default Login