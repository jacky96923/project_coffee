import { useQuery } from "@tanstack/react-query";
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
