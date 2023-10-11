import React from 'react';

function TierForm({ editingTier, isEditing, setEditingTier, handleSave, handleCancel}) {
    if (!editingTier) {
        return  ('')
      }
    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="mx-auto w-full max-w-[850px] bg-white p-12 rounded-lg shadow-lg">
                            <form action="https://formbold.com/s/FORM_ID" method="POST">
                                <div className="grid justify-items-end">

                                </div>
                                <div className="-mx-3 flex flex-rows">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="">
                                            <label className=" block text-base font-medium text-[#07074D]">
                                                Tên
                                            </label>
                                            <input
                                                type="text"
                                                value={editingTier.tiername}
                                                onChange={(e) => setEditingTier({ ...editingTier, tiername: e.target.value })}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <button className="hover:shadow-form rounded-md bg-[#3eb15b] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        onClick={handleSave}>
                                        Lưu
                                    </button>
                                    <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        onClick={handleCancel}>
                                        Đóng
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
  );
}
export default TierForm;