import { useQuery } from "@tanstack/react-query";
import { Inputs } from "../Pages/AddItem/AddItem";
// const source = process.env.REACT_APP_API_SERVER;
const source = "http://localhost:8100";

export function GetItemInfo(itemId: number) {
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

  if (isLoading || isFetching) return "Item info coming";

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

export async function AddItemInfo(newItemData: FormData) {
  const res = await fetch(`${source}/AddItem/addItemInfo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: newItemData,
  });

  const resp = await res.json();

  // on receive token,save in localStorage

  if (resp.message === "success") {
    return true;
  } else {
    console.log(resp.message);
    return false;
  }
}

export function GetAllOptionListWithOptions() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["getAllOptionListWithOptions"],
    queryFn: async () => {
      const res = await fetch(`${source}/AddItem/getAllOptionListWithOptions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      return result;
    },
  });

  if (isLoading || isFetching) return "Item info coming";

  if (error) {
    return "Cannot get option list so fuck";
  }

  if (!data) {
    return "Where has option list gone?";
  }

  return data;
}
