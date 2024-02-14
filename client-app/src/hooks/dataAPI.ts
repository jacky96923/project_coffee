import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8100";

export function getShopDisplaying() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["shopDisplaying"],
    queryFn: async () => {
      const res = await fetch(`${source}/shops/shop`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resp = await res.json();
      return resp.data;
    },
  });

  if (isLoading || isFetching) return "Data is coming";

  if (error) {
    return "Error occured";
  }

  if (!data) {
    return [];
  }

  return data;
}
