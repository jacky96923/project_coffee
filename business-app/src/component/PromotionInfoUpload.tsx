import React, { useState, ChangeEvent } from "react";

export type PromotionInfoUploadProps = {
  uploadName: string;
  uploadType: string;
};

export default function PromotionInfoUpload(props: PromotionInfoUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreviewURL(null);
    }
  };

  return (
    <section className="container w-full mx-auto items-center py-8">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
        <div className="flex items-center justify-center">
          <div className="w-full">
            <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
              <span className="text-center ml-2">{props.uploadName}</span>
            </label>
          </div>
        </div>
        <div className="px-4 py-6">
          <div
            id="image-preview"
            className={`max-w-sm p-6 mb-4 ${
              previewURL
                ? "border-gray-400"
                : "border-dashed border-2 border-gray-400"
            } rounded-lg items-center mx-auto text-center cursor-pointer`}
          >
            <input
              id="upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="upload" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-gray-700 mx-auto mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                上傳圖片
              </h5>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                Choose photo size should be less than{" "}
                <b className="text-gray-600">2mb</b>
              </p>
              {previewURL ? <img src={previewURL}></img> : ""}
              <p className="font-normal text-sm text-gray-400 md:px-6">
                and should be in{" "}
                <b className="text-gray-600">JPG, PNG, or GIF</b> format.
              </p>
              {/* Post selected filename*/}
              <span id="filename" className="text-gray-500 bg-gray-200 z-50">
                {selectedFile ? selectedFile.name : ""}
              </span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
