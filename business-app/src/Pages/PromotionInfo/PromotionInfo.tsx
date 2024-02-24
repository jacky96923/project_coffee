import { useMatch, useParams, useSearchParams } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import styles from "../PromotionInfo/PromotionInfo.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetPromotionInfo } from "../../hook/PromotionInfoApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { uploadPhoto } from "../../hook/PromotionInfoApi";

export default function PromotionInfo() {
  // let shopID: string;
  const queryClient = useQueryClient();

  const shopId: any = useSelector<RootState>((state) => state.auth.id);
  console.log("check shopID", shopId);

  const promotionInfo = GetPromotionInfo(shopId);
  //   | string
  //   | {
  //       images: Array<{
  //         filename: string;
  //         isCover: boolean;
  //         isLogo: true;
  //       }>[];
  //       description: Array<{
  //         description: string;
  //       }>;
  //     }

  const [logoSelectedFile, setLogoSelectedFile] = useState<File | null>(null);
  const [logoPreviewURL, setLogoPreviewURL] = useState<string | null>(null);
  const [bannerSelectedFile, setBannerSelectedFile] = useState<File | null>(
    null
  );
  const [bannerPreviewURL, setBannerPreviewURL] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  // for image upload

  const logoHandleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const logoFile = event.target.files?.[0];
    if (logoFile) {
      setLogoSelectedFile(logoFile);
      setLogoPreviewURL(URL.createObjectURL(logoFile));
    } else {
      setLogoSelectedFile(null);
      setLogoPreviewURL(null);
    }
  };

  const bannerHandleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const bannerFile = event.target.files?.[0];

    if (bannerFile) {
      setBannerSelectedFile(bannerFile);
      setBannerPreviewURL(URL.createObjectURL(bannerFile));
    } else {
      setBannerSelectedFile(null);
      setBannerPreviewURL(null);
    }
  };

  // const mutation = useMutation((formData: FormData) => uploadPhoto(formData), {
  //   onSuccess: () => queryClient.invalidateQueries(["getPromotionInfo"]),
  // });

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (logoSelectedFile !== null && bannerSelectedFile !== null) {
      const formData = new FormData();
      formData.append("logoFile", logoSelectedFile);
      formData.append("bannerFile", bannerSelectedFile);
      formData.append("description", description);
      // mutation.mutate(formData);
    } else {
      alert("please upload all the files");
    }
  }

  // for image upload
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className={styles.content}>
          <div className={styles.pageTitle}>推廣資料</div>
          <form onSubmit={submit}>
            {/* Logo upload */}
            <div className={styles.logoUpload}>
              <section className="container w-full mx-auto items-center py-8">
                <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                  <div className="flex items-center justify-center">
                    <div className="w-full">
                      <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                        <span className="text-center ml-2">上傳商店Logo</span>
                      </label>
                    </div>
                  </div>
                  <div className="px-4 py-6">
                    <div
                      id="logo-image-preview"
                      className={`max-w-sm p-6 mb-4 ${
                        logoPreviewURL
                          ? "border-gray-400"
                          : "border-dashed border-2 border-gray-400"
                      } rounded-lg items-center mx-auto text-center cursor-pointer`}
                    >
                      <input
                        id="logo_upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={logoHandleFileChange}
                      />
                      {/* Error message for logo upload */}

                      <label htmlFor="logo_upload" className="cursor-pointer">
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
                        {logoPreviewURL ? <img src={logoPreviewURL}></img> : ""}
                        {promotionInfo && promotionInfo !== "Incoming ..." ? (
                          <img
                            src={
                              promotionInfo.images.find(
                                (entry: any) => entry.isLogo == true
                              ).filename
                            }
                          ></img>
                        ) : (
                          ""
                        )}
                        <p className="font-normal text-sm text-gray-400 md:px-6">
                          and should be in{" "}
                          <b className="text-gray-600">JPG, PNG, or GIF</b>{" "}
                          format.
                        </p>
                        {/* Post selected filename*/}
                        <span
                          id="filename"
                          className="text-gray-500 bg-gray-200 z-50"
                        >
                          {logoSelectedFile ? logoSelectedFile.name : ""}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* Logo upload */}
            {/* Banner upload */}
            <div className={styles.logoUpload}>
              <section className="container w-full mx-auto items-center py-8">
                <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                  <div className="flex items-center justify-center">
                    <div className="w-full">
                      <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                        <span className="text-center ml-2">上傳商店橫額</span>
                      </label>
                    </div>
                  </div>
                  <div className="px-4 py-6">
                    <div
                      id="banner-image-preview"
                      className={`max-w-sm p-6 mb-4 ${
                        bannerPreviewURL
                          ? "border-gray-400"
                          : "border-dashed border-2 border-gray-400"
                      } rounded-lg items-center mx-auto text-center cursor-pointer`}
                    >
                      <input
                        id="banner_upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={bannerHandleFileChange}
                      />
                      {/* Error message for banner upload */}
                      <label htmlFor="banner_upload" className="cursor-pointer">
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
                        {bannerPreviewURL ? (
                          <img src={bannerPreviewURL}></img>
                        ) : (
                          ""
                        )}
                        {promotionInfo && promotionInfo !== "Incoming ..." ? (
                          <img
                            src={
                              promotionInfo.images.find(
                                (entry: any) => entry.isCover == true
                              ).filename
                            }
                          ></img>
                        ) : (
                          ""
                        )}
                        <p className="font-normal text-sm text-gray-400 md:px-6">
                          and should be in{" "}
                          <b className="text-gray-600">JPG, PNG, or GIF</b>{" "}
                          format.
                        </p>
                        {/* Post selected filename*/}
                        <span
                          id="filename"
                          className="text-gray-500 bg-gray-200 z-50"
                        >
                          {bannerSelectedFile ? bannerSelectedFile.name : ""}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* Banner upload */}
            <section className="container w-full mx-auto items-center py-8">
              <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                <div className="flex items-center justify-center">
                  <div className="w-full">
                    <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                      <span className="text-center ml-2">填寫商鋪簡介資料</span>
                    </label>
                  </div>
                </div>
                <div className="px-4 py-6">
                  <textarea
                    id="shopDescription"
                    className="textarea textarea-bordered"
                    placeholder={
                      promotionInfo && promotionInfo !== "Incoming ..."
                        ? promotionInfo.description[0].description
                        : "在賣特色咖啡"
                    }
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                提交資料
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}
