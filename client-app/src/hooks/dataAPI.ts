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
    return "Error occurred";
  }
  if (!data) {
    return [];
  }
  return data;
}

export function GetMenuPage(id: number) {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["CategoryId"],
    queryFn: async () => {
      let result: {
        categoryItemList: {
          categoryName: string;
          itemsInformation: {
            id: number;
            name: string;
            item_photo: string;
            price: number;
            description: string;
            shop_id: number;
          }[];
        }[];
        shopInformation: {
          data: Array<{
            id: number;
            shop_name: string;
            address: string;
          }>;
        };
      } = { categoryItemList: [], shopInformation: { data: [] } };

      // ------------------------------------------------------------------------------
      const resMenuId = await fetch(`${source}/menus/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const MenuId = await resMenuId.json();

      // ------------------------------------------------------------------------------
      const resCategoryItem = await fetch(`${source}/menus/categoryItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryIdList: MenuId.data,
        }),
      });
      const CategoryItem = await resCategoryItem.json();
      // console.log("CategoryItem", CategoryItem);

      result.categoryItemList = CategoryItem;

      // ------------------------------------------------------------------------------
      const resShopInformation = await fetch(
        `${source}/menus/shopInformation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      const shopInformation = await resShopInformation.json();
      result.shopInformation = shopInformation;

      // ------------------------------------------------------------------------------
      // const resItemsInformation = await fetch(
      //   `${source}/menus/itemsInformation`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       categoryIdList: MenuId.data,
      //     }),
      //   }
      // );

      // const itemsInformation = await resItemsInformation.json();
      // result.itemsInformation = itemsInformation;

      // ------------------------------------------------------------------------------
      // console.log("result", result);
      return result;
    },
  });

  if (isLoading || isFetching) return "Data is coming";
  if (error) return "Error occurred";
  if (!data) return "";
  return data;
}
