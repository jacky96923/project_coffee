import { useQuery } from "@tanstack/react-query";
const source = "http://localhost:8100";

export function GetAllItem(shopId: number) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["getAllItem"],
    queryFn: async () => {
      const res = await fetch(`${source}/AllItem/getAllItem`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      return result;
    },
  });

  if (isLoading || isFetching) return "AllItem comming";

  if (error) {
    return "Cannot get AllItem so fuck";
  }

  if (!data) {
    return "Where has AllItem gone?";
  }

  return data;
}

export async function passCheckedItem(checkedItem: Array<number>) {
  console.log("AllItem--APi", checkedItem);

  const res = await fetch(`${source}/AllItem/getAllItem/passCheckedItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ checkedItemList: checkedItem }),
  });

  return await res.json();
}
