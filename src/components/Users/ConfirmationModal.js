import React from 'react'

const ConfirmationModal = ({ handleDeleteConfirmed, hideToast }) => {
  return (
    <div className="confirmation-modal">
      <p>Bạn có chắc chắn muốn xóa?</p>
      <div className='flex gap-2'> 
        <button className="bg-rose-600 text-white" onClick={handleDeleteConfirmed}>
          Xác nhận
        </button>
        <button className="bg-lime-600 text-white" onClick={hideToast}>
          Hủy bỏ
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal