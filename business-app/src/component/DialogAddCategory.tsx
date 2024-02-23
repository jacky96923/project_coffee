import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { queryClient } from "..";
import { AddCategory } from "../hooks/dialogMenuPreviewAPI";

interface EditDialogProps {
  onClose: () => void;
}

const DialogAddCategory: React.FC<EditDialogProps> = ({ onClose }) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onClose();
  };
  const [addCatInput, setAddCatInput] = useState("");

  // useSelector
  const shopId = 1;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: { catName: string }) =>
      AddCategory(data.catName, shopId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["menuPreview"],
        exact: true,
      }),
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md absolute">
        <h2 className="text-2xl font-bold m-4 text-black	underline underline-offset-8">
          增加種類
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-base	 mb-1  text-black">
              （原本個個）
            </label>
            <input
              type="text"
              id="text"
              className="w-full rou nded border-gray-300 px-3 py-2 text-black mt-7"
              name="catName"
              value={addCatInput}
              onChange={(e) => {
                setAddCatInput(e.target.value);
              }}
              //   value={email}
              //   onChange={handleEmailChange}
            />
          </div>

          <div className="flex justify-end m-7">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded m-2 text-xl	"
              onClick={() => {
                mutation.mutate({ catName: addCatInput });
                setAddCatInput("");
              }}
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

export default DialogAddCategory;
