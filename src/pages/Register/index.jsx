import React from 'react'

const index = () => {
  return (
<div className="h-screen bg-indigo-100 flex justify-center items-center">
  <div className="lg:w-2/5 md:w-1/2 w-2/3">
    <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
      <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Đăng kí</h1>
      <div classname="flex flex-items justify-between">
        <div>
          <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="username">Họ</label>
          <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" id="username" placeholder="Nguyễn..." />
        </div>
        <div>
          <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="email">Tên</label>
          <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="email" id="email" placeholder="Phú..." />
        </div>
      </div>
      <div>
        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Địa chỉ</label>
        <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="Tên đường, số nhà..." />
      </div>
      <div>
        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Số điện thoại</label>
        <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="079..." />
      </div>
      <div>
        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Mật khẩu</label>
        <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="password" />
      </div>
      <div>
        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="confirm">Xác nhận mật khẩu</label>
        <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="confirm" id="confirm" placeholder="confirm password" />
      </div>
      <button type="submit" className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Đăng kí</button>
      <button type="submit" className="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans">Đăng Nhập</button>
    </form>
  </div>
</div>

  )
}

export default index