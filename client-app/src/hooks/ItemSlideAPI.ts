import { useQuery } from "@tanstack/react-query";

// const source = process.env.REACT_APP_API_SERVER;
const source = "http://localhost:8100";

export function GetOptionInfo(itemId: string, option: string) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["optionInfo", itemId, option],
    queryFn: async () => {
      const res = await fetch(`${source}/itemPage/${itemId}/${option}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log("-------Slide----API---------", result);
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
