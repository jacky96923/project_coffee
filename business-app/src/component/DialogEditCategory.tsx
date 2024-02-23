import React, { useState } from "react";

interface EditDialogProps {
  onClose: () => void;
}

const DialogEditCategory: React.FC<EditDialogProps> = ({ onClose }) => {
  //   const handleNameChange = (e: any) => {
  //     setName(e.target.value);
  //   };

  //   const handleEmailChange = (e: any) => {
  //     setEmail(e.target.value);
  //   };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md">
        <h2 className="text-2xl font-bold m-4 text-black	underline underline-offset-8">
          編輯種類
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-base	 mb-1  text-black">
              （原本個個）
            </label>
            <input
              type="text"
              id="text"
              className="w-full rounded border-gray-300 px-3 py-2 text-black mt-7"
              //   value={email}
              //   onChange={handleEmailChange}
            />
          </div>

          <div className="flex justify-end m-7">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded m-2 text-xl	"
            >
              儲存
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gradient-to-r from-red-900 to-red-700 text-white px-4 py-2 rounded text-xl	m-2"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DialogEditCategory;
