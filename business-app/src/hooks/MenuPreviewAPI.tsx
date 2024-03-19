import { useQuery } from "@tanstack/react-query";
// const source = process.env.REACT_APP_API_SERVER;
const source = "http://localhost:8100";

export function GetMenuPreview(id: number) {
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
      return resp;
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

export async function EditCategory(updateCatName: string, categoryId: number) {
  const resNewCat = await fetch(`${source}/menuPreviews/updateCategoryName`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nameInput: updateCatName,
      categoryId: categoryId,
    }),
  });
  const result = await resNewCat.json();
  // console.log("result", result);

  return result.data;
}

export async function DelCategory(categoryId: number) {
  const resDelCat = await fetch(`${source}/menuPreviews/deleteCategoryName`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // nameInput: updateCatName,
      categoryId: categoryId,
    }),
  });
  console.log("categoryId", categoryId);

  const result = await resDelCat.json();
  // console.log("result", result);

  return result;
}

export async function DelItem(categoryId: number, itemId: number[]) {
  const resDelItem = await fetch(`${source}/menuPreviews/deleteItem`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // nameInput: updateCatName,
      categoryId: categoryId,
      itemId: itemId,
    }),
  });
  // console.log("itemId", itemId);

  const result = await resDelItem.json();
  console.log("result", result);

  return result;
}

export async function AddItemToCat(categoryId: number, itemId: number[]) {
  const resAddItem = await fetch(`${source}/menuPreviews/addItemToCat`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // nameInput: updateCatName,
      categoryId: categoryId,
      itemId: itemId,
    }),
  });
  // console.log("itemId", itemId);

  const result = await resAddItem.json();
  console.log("result", result);
  if (result.error) {
    throw Error(result.error);
  }
}
