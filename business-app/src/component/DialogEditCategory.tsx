import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditCategory } from "../hooks/MenuPreviewAPI";

interface EditDialogProps {
  onClose: () => void;
  categoryId: number;
  categoryName: string;
  isShow: boolean;
}

const DialogEditCategory: React.FC<EditDialogProps> = ({
  onClose,
  categoryId,
  categoryName,
  isShow,
}) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const handleClose = () => {
    console.log("handling close");
    onClose();
  };

  // useSelector
  // const categoryId = 1;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { updateCatName: string }) =>
      EditCategory(data.updateCatName, categoryId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["menuPreview"],
        exact: true,
      }),
  });

  const [editCatInput, setEditCatInput] = useState("");

  if (isShow)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
        <div className="bg-white rounded-lg p-6 max-w-md">
          <h2 className="text-2xl font-bold m-4 text-black	underline underline-offset-8 ">
            編輯種類
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="m-4">
              <label
                htmlFor="name"
                className="block text-base	 mb-1  text-black align-middle items-center text-center font-bold "
              >
                {categoryName}
              </label>
              <input
                type="text"
                id="text"
                className="w-full rounded border-gray-300 px-3 py-2 text-black mt-4"
                name="updateCatName"
                value={editCatInput}
                onChange={(e) => {
                  setEditCatInput(e.target.value);
                }}
              />
            </div>

            <div className="flex justify-end m-7">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-4 py-2 rounded m-2 text-xl	"
                onClick={() => {
                  mutation.mutate({ updateCatName: editCatInput });
                  setEditCatInput("");
                }}
              >
                儲存
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="bg-gradient-to-r from-red-900 to-red-700 text-white px-4 py-2 rounded text-xl	m-2"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  else {
    return <></>;
  }
};

export default DialogEditCategory;
