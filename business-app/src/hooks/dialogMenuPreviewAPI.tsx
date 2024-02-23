const source = "http://localhost:8100";

export async function AddCategory(catName: string, shopId: number) {
  const resCat = await fetch(`${source}/category/categoryName`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nameInput: catName, shopId: shopId }),
  });
  const result = await resCat.json();
  console.log("result", result);

  return result.data;
}
