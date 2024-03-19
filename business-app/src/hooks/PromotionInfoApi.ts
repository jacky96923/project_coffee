import { useQuery } from "@tanstack/react-query";
// const source = process.env.REACT_APP_API_SERVER;
const source = "http://localhost:8100";

export function GetPromotionInfo(shopId: number) {
  console.log("api------running?-----");
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["getPromotionInfo"],

    queryFn: async () => {
      const res = await fetch(`${source}/PromotionInfo/getPromotionInfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

export const uploadPhoto = async (formData: FormData) => {
  const res = await fetch(`${source}/PromotionInfo/uploads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  return await res.json();
};
