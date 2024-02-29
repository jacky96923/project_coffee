import { useQuery } from "@tanstack/react-query";
const source = "http://localhost:8100";

export function GetShopInformation(shopId: number) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["mainPage"],
    queryFn: async () => {
      const getShopInfo = await fetch(`${source}/mainPage/getMainInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          shopId: shopId,
        }),
      });
      const resp = await getShopInfo.json();
      return resp;
    },
  });
  if (isLoading || isFetching) return "Data is coming";
  if (error) {
    return "Error occurred";
  }
  if (!data) {
    return [];
  }
  return data;
}
