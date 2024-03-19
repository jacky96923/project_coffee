import { useQuery } from "@tanstack/react-query";

// const source = process.env.REACT_APP_API_SERVER;
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

export function Getalloptions(itemId: string) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["initialState"],
    queryFn: async () => {
      const res = await fetch(`${source}/itemPage/initialState/${itemId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log("-------API--initialState---------", result);
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
