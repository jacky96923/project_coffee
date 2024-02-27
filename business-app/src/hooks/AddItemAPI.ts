import { useQuery } from "@tanstack/react-query";
const source = "http://localhost:8100";

export function GetItemInfo(itemId: string) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["getItemInfo"],
    queryFn: async () => {
      const res = await fetch(`${source}/AddItem/getItemInfo/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      return result;
    },
  });

  if (isLoading || isFetching) return "Item info comming";

  if (error) {
    return "Cannot get Item info so fuck";
  }

  if (!data) {
    return "Where has Item info gone?";
  }

  return data;
}

export function AddItemInfo() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["addItemInfo"],
    queryFn: async () => {
      const res = await fetch(`${source}/AddItem/addItemInfo`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      return result;
    },
  });

  if (isLoading || isFetching) return "Item info comming";

  if (error) {
    return "Cannot get Item info so fuck";
  }

  if (!data) {
    return "Where has Item info gone?";
  }

  return data;
}

export function GetAllTypes() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["getAllTypes"],
    queryFn: async () => {
      const res = await fetch(`${source}/AddItem/getAllTypes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      return result;
    },
  });

  if (isLoading || isFetching) return "Item info comming";

  if (error) {
    return "Cannot get Item info so fuck";
  }

  if (!data) {
    return "Where has Item info gone?";
  }

  return data;
}
