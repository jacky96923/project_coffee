import React, { useEffect } from "react";
import styles from "./ShoppingCartPage.module.css";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  ConfirmClearCartModal,
  NoUserLoginModal,
  PickupModal,
} from "../../components/Modal";
import ShoppingCartItem, { ItemProps } from "../../components/ShoppingCartItem";

import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";

export default function ShoppingCartPage() {
  const navigate = useNavigate();

  // set fake data
  // useEffect(() => {
  //   localStorage.setItem(
  //     "shoppingCart",
  //     JSON.stringify({
  //       shopName: "Blue Bottle Coffee",
  //       shopAddress: "中環擺花街38號地舖及1樓",
  //       itemList: [
  //         {
  //           itemId: 234,
  //           name: "朱古力咖啡",
  //           item_photo: "",
  //           size: "小杯",
  //           price: 25,
  //           optionList: [
  //             { 凍: null },
  //             { 特選咖啡豆: 10 },
  //             { 不加奶油: null },
  //             { 燕麥奶: 5 },
  //             { 正常糖: null },
  //           ],
  //           quantity: 2,
  //           subTotal: 80,
  //         },
  //         {
  //           itemId: 234,
  //           name: "朱古力咖啡",
  //           item_photo: "",
  //           size: "小杯",
  //           price: 25,
  //           optionList: [
  //             { 凍: null },
  //             { 特選咖啡豆: 10 },
  //             { 不加奶油: null },
  //             { 豆奶: null },
  //             { 正常糖: null },
  //           ],
  //           quantity: 1,
  //           subTotal: 35,
  //         },
  //       ],
  //     })
  //   );
  // }, []);

  // All data received for this page
  let shoppingCartPage =
    JSON.parse(localStorage.getItem("shoppingCart") as string) || undefined;
  console.log("shoppingCartPage", shoppingCartPage);

  // Shop Info
  const shopId = shoppingCartPage?.shopId;
  const shopName = shoppingCartPage?.shopName;
  const shopAddress = shoppingCartPage?.address;

  // State for Shopping Cart Info
  const itemListWithKey = shoppingCartPage?.itemList.map(
    (item: ItemProps, idx: number) => {
      item.key = idx + 1;
      return item;
    }
  );
  // console.log("itemListWithKey", itemListWithKey)
  const [cart, setCart]: [Array<ItemProps>, any] = useState(itemListWithKey);
  const [safeClearCartModal, setSafeClearCartModal] = useState(false);

  // State for pickup time
  const [pickupModal, setPickupModal] = useState(false);
  const pickupTime = useSelector(
    (state: RootState) => state.shoppingCart.pickupTime
  );

  // State for bill and checkout
  // const [discount, setDiscount] = useState(false)
  // const [rewardPoint, setRewardPoint] = useState(false)
  const [total, setTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [noUserLoginModal, setNoUserLoginModal] = useState(false);

  //
  useEffect(() => {
    let itemsSubtotalList = cart.map((item) => item.subTotal);
    //console.log("itemsSubtotalList", itemsSubtotalList)
    let itemsSubtotalSum = itemsSubtotalList.reduce((acc, cur) => acc + cur, 0);
    //console.log("itemsSubtotalSum", itemsSubtotalSum)
    setTotal(itemsSubtotalSum);
    setDiscountedTotal(itemsSubtotalSum);
  }, [total, discountedTotal]);

  const onDeleteItemHandler = (key: number) => {
    if (shoppingCartPage.itemList.length > 1) {
      const itemToDeleteIndex = shoppingCartPage.itemList.findIndex(
        (item: ItemProps) => item.key === key
      );
      shoppingCartPage.itemList.splice(itemToDeleteIndex, 1);
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartPage));
      setCart(shoppingCartPage.itemList);
      setTotal(0);
      setDiscountedTotal(0);
    } else {
      onSafeClearCartHandler();
    }
  };

  const onMenuHandler = () => {
    navigate(`/menu/${shopId}`);
  };

  const onSafeClearCartHandler = () => {
    setSafeClearCartModal(true);
  };

  const onClearCartHandler = () => {
    // shoppingCartPage.itemList = [];
    // localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartPage));
    // setCart(shoppingCartPage.itemList);
    // setTotal(0);
    // setDiscountedTotal(0);
    // setSafeClearCartModal(false);
    localStorage.removeItem("shoppingCart");
    setSafeClearCartModal(false);
    navigate("/shopSelection");
  };

  const onCheckoutHandler = async () => {
    // 1. check if there is user login
    if (localStorage.getItem("token") === null) {
      setNoUserLoginModal(true);
    } else {
      // 2. if yes, create req.body for checkout fetch
      const checkoutData = {
        shop_id: shopId,
        cart: itemListWithKey,
        pickupTime: pickupTime,
        total: total,
      };
      console.log("checkoutData", checkoutData);
      console.log("cart in checkout", checkoutData.cart);
      // 3. fetch to get the url for checkout
      let result = await fetch(
        "http://localhost:8100/stripe/create-checkout-session",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(checkoutData),
        }
      );
      // 4. direct to the url in question
      if (result.ok) {
        console.log("Request sent successfully");

        // Fetch the session URL from the response
        const { url } = await result.json();

        // Clear shopping cart in localStorage
        localStorage.removeItem("shoppingCart");

        // Redirect the user to the Stripe Checkout page
        window.location.href = url;
      }
    }
  };

  const onPickupTimeHandler = () => {
    setPickupModal(true);
  };

  const onLoginHandler = () => {
    navigate("/client-login");
  };

  return (
    <div className={styles.container}>
      {/* header */}
      <div className="flex ">
        <button
          onClick={() => navigate(`/menu/${shopId}`)}
          className={`self-center btn btn-circle btn-sm`}
        >
          <ChevronLeftIcon className="h-5 w-5 text-green-800 " />
        </button>
        <div className="ml-3">
          <h4 className="font-bold text-2xl ">我的購物車</h4>
        </div>
      </div>

      <div className=" flex border-b border-slate-700">
        <h6 className="m-1 ml-12 text-green-800 font-bold	">{shopName}</h6>
        <div className="flex mt-1 ml-12">
          <IoLocationSharp className="m-1 text-green-800" />
          <p className=""> {shopAddress}</p>
        </div>
      </div>

      {/* shopping cart & buttons for edit cart */}
      <div className="overflow-y-auto h-1/3">
        {cart.map((item) => (
          <ShoppingCartItem
            key={item.key}
            item={item}
            onDelete={() => onDeleteItemHandler(item.key)}
          />
        ))}
      </div>
      <div className=" ">
        <button
          className="block mx-auto w-72 my-1.5 bg-gradient-to-r from-light-green to-dark-green rounded-2xl font-bold text-white"
          onClick={onMenuHandler}
        >
          增加産品
        </button>
        <button
          className="block mx-auto w-72 my-1.5 border border-dark-green rounded-2xl font-bold text-red-500 mt-3 mb-2"
          onClick={onSafeClearCartHandler}
        >
          清空購物車
        </button>
        <ConfirmClearCartModal
          show={safeClearCartModal}
          onClose={() => setSafeClearCartModal(false)}
          onDelete={onClearCartHandler}
        />
      </div>
      {/* Discount & bill total */}
      <div className="border-b border-slate-700">
        <h6 className="font-bold m-2">訂單總結</h6>
      </div>
      <div className="border-b border-slate-700 m-2">
        <button className="block mx-auto font-bold text-tahiti m-1">
          + 使用優惠卷
        </button>
        <button className="block mx-auto font-bold text-tahiti m-2">
          + 使用積分
        </button>
      </div>

      {/* Pickup Time */}
      <div className="">
        <h6 className="font-bold m-2">選擇自取時間</h6>
        <button
          className="flex justify-around mx-auto w-72 my-1.5 bg-gradient-to-r from-light-green to-dark-green rounded-2xl font-bold text-white"
          onClick={onPickupTimeHandler}
        >
          自取時間： {pickupTime} {/*use pickup time in localstorage*/}
          <ChevronRightIcon className="h-6 w-6" />
        </button>
        <PickupModal
          show={pickupModal}
          onClose={() => setPickupModal(false)}
        ></PickupModal>
      </div>
      <div className="w-5/6 mx-auto">
        <div className="flex justify-around my-1.5">
          <h6 className="font-bold">小計</h6>
          <p className="font-bold">${total}</p>
        </div>
        <div className="flex justify-around my-1.5">
          <h6 className="font-bold">總額</h6>
          <p className="font-bold">${discountedTotal}</p>
        </div>
        <div></div>
      </div>

      {/* Checkout */}
      <div className="flex justify-around m-5">
        <div>
          <h4>訂單總額</h4>
          <h4 className="font-bold	">HK$ {discountedTotal}.00</h4>
        </div>
        <button
          className="border rounded-2xl w-16 border-black text-green-800 font-bold	"
          onClick={onCheckoutHandler}
        >
          付款
        </button>
        <NoUserLoginModal
          show={noUserLoginModal}
          onClose={() => setNoUserLoginModal(false)}
          onLogin={onLoginHandler}
        />
      </div>
    </div>
  );
}
