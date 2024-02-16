import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8100";

export function GetItemInfo(itemId: string) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["itemInfo"],
    queryFn: async () => {
      const res = await fetch(`${source}/itemPage/${itemId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log("-------newAPI---------", result);
      return result;
    },
  });

  if (isLoading || isFetching) return "Incoming Data ...";

  if (error) {
    return "Error occured";
  }

  if (!data) {
    return [];
  }

  return data;
}
