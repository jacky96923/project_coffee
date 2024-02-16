import { useQuery } from "@tanstack/react-query";

const source = "http://localhost:8100";

export function GetShopDisplaying() {
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

export function CategoryId(id: number) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["CategoryId"],
    queryFn: async () => {
      const res = await fetch(`${source}/menus/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const resp = await res.json();
      return resp;
    },
  });

  if (isLoading || isFetching) return "Data is coming";
  if (error) return "Error occurred";
  if (!data) return [];
  return data;
}

export function CategoryName(categoryIdList: { id: number }[]) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["CategoryName"],
    queryFn: async () => {
      const res = await fetch(`${source}/menus/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryIdList,
        }),
      });
      const resp = await res.json();
      return resp;
    },
  });

  if (isLoading || isFetching) return "Data is coming";
  if (error) return "Error occurred";
  if (!data) return [];
  return data;
}

// Not ok here!!!!!!!!!!!!!!!!!
