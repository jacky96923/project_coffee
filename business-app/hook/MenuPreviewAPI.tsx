import { useQuery } from "@tanstack/react-query";
const source = "http://localhost:8100";

export default function GetMenuPreview(id: number) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["menuPreview"],
    queryFn: async () => {
      const res = await fetch(`${source}/menuPreviews/menuPreview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const resp = await res.json();
      return resp.data;
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
