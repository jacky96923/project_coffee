import { useQuery } from "@tanstack/react-query";
const source = "http://localhost:8100";

export function GetPromotionInfo(shopId: number) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["getPromotionInfo"],
    queryFn: async () => {
      const res = await fetch(
        `${source}/PromotionInfo/getPromotionInfo/${shopId}`
      );
      const result = await res.json();
      console.log("-------GetPromotionInfo API---------", result);
      return result;
    },
  });

  if (isLoading || isFetching) return "Incoming ...";

  if (error) {
    return "Cannot get uploaded PromoInfo";
  }

  if (!data) {
    return "";
  }

  return data;
}

export const uploadPhoto = async (formData: FormData, shopId: number) => {
  const res = await fetch(`${source}/PromotionInfo/uploads/${shopId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  return await res.json();
};

// export function UploadPromotionInfo(formData: FormData) {
//   const { isLoading, error, data, isFetching } = useQuery({
//     queryKey: ["uploadPromotionInfo"],
//     queryFn: async () => {
//       const res = await fetch(`${source}/PromotionInfo/uploads/${shopId}`, {
//         method: "POST",
//         body: formData,
//       });
//       const result = await res.json();
//       console.log("-------PromoInfoUploadSuccess---------", result);
//       return result;
//     },
//   });

//   if (isLoading || isFetching) return "Sending ...";

//   if (error) {
//     return "Error occured";
//   }

//   if (!data) {
//     return "Upload Failed";
//   }

//   return data;
// }
