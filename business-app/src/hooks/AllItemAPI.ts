import { useQuery } from "@tanstack/react-query";
// const source = process.env.REACT_APP_API_SERVER;
const source = "http://localhost:8100";

export function GetAllItem() {
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

  if (isLoading || isFetching) return "data coming";

  if (error) {
    return "error";
  }

  if (!data) {
    return "no data";
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
