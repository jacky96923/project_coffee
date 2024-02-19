import React, { useEffect } from 'react'
import styles from './ShoppingCartPage.module.css'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { ConfirmClearCartModal, PickupModal } from '../../components/Modal';
import ShoppingCartItem, { ItemProps } from '../../components/ShoppingCartItem'

import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useNavigate } from 'react-router-dom';

export default function ShoppingCartPage() {
    // const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    // set fake data
    useEffect(() => {

        localStorage.setItem("shoppingCart",
            JSON.stringify({
                shopName: "Blue Bottle Coffee",
                shopAddress: "中環擺花街38號地舖及1樓",
                itemList: [
                    {
                        itemId: 234,
                        name: "朱古力咖啡",
                        item_photo: "",
                        size: "小杯",
                        price: 25,
                        optionList: [
                            { "凍": null },
                            { "特選咖啡豆": 10 },
                            { "不加奶油": null },
                            { "燕麥奶": 5 },
                            { "正常糖": null }],
                        quantity: 2,
                        subTotal: 80
                    }, 
                    {
                        itemId: 234,
                        name: "朱古力咖啡",
                        item_photo: "",
                        size: "小杯",
                        price: 25,
                        optionList: [
                            { "凍": null },
                            { "特選咖啡豆": 10 },
                            { "不加奶油": null },
                            { "豆奶": null },
                            { "正常糖": null }],
                        quantity: 1,
                        subTotal: 35
                    }
                ]
            })
        )

    }, [])

    // All data received for this page
    const user_id = useSelector((state: RootState) => state.auth.user_id)
    let shoppingCartPage = JSON.parse(localStorage.getItem("shoppingCart") as string) || undefined
    console.log("shoppingCartPage", shoppingCartPage)

    // Shop Info
    const shopName = shoppingCartPage?.shopName
    const shopAddress = shoppingCartPage?.shopAddress

    // Shopping Cart Info & Utils
    // const [key, setKey] = useState(shoppingCartPage?.itemList.length)
    const itemListWithKey = shoppingCartPage?.itemList.map((item: ItemProps, idx: number)=>{
        item.key = idx+1
        return item
    })
    // console.log("itemListWithKey", itemListWithKey)
    const [cart, setCart]: [Array<ItemProps>, any] = useState(itemListWithKey)
    const [safeClearCartModal, setSafeClearCartModal] = useState(false)

        // State for pickup time
    const [pickupModal, setPickupModal] = useState(false)
    const pickupTime = useSelector((state: RootState) => state.shoppingCart.pickupTime)

        // State for bill
    // const [discount, setDiscount] = useState(false)
    // const [rewardPoint, setRewardPoint] = useState(false)
    const [total, setTotal] = useState(0)
    const [discountedTotal, setDiscountedTotal] = useState(0)

    //
    useEffect(() => {
        let itemsSubtotalList = cart.map((item) => item.subTotal)
        //console.log("itemsSubtotalList", itemsSubtotalList)
        let itemsSubtotalSum = itemsSubtotalList.reduce((acc, cur) => acc + cur, 0)
        //console.log("itemsSubtotalSum", itemsSubtotalSum)
        setTotal(itemsSubtotalSum)
        setDiscountedTotal(itemsSubtotalSum)
    }, [total, discountedTotal])

    const onDeleteItemHandler = (key: number) => {
        const itemToDeleteIndex = shoppingCartPage.itemList.findIndex((item: ItemProps) => item.key===key)
        shoppingCartPage.itemList.splice(itemToDeleteIndex, 1)
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartPage))
        setCart(shoppingCartPage.itemList)
        setTotal(0)
        setDiscountedTotal(0)
    }

    const onMenuHandler = () => {
        navigate("/")
    }

    const onSafeClearCartHandler = () => {
        setSafeClearCartModal(true)
    }

    const onClearCartHandler = () => {
        shoppingCartPage.itemList = []
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartPage))
        setCart(shoppingCartPage.itemList)
        setTotal(0)
        setDiscountedTotal(0)
        setSafeClearCartModal(false)
    }

    const onCheckoutHandler = async () => {
        // 1. check if there is user login (isLoggedIn guard solved)
        
        // 2. if yes, create req.body for checkout fetch
        
        const checkoutData = {user_id: user_id, cart: itemListWithKey}
        console.log("checkoutData", checkoutData)
        // 3. fetch to get the url for checkout
        let result = await fetch("http://localhost:8100/stripe/create-checkout-session", {
            method: 'post',
            headers: {
                'Content-Type': "application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(checkoutData)
        })
        // 4. direct to the url in question 
        if (result.ok) {
            console.log('Request sent successfully');
    
            // Fetch the session URL from the response
            const { url } = await result.json();
    
            // Redirect the user to the Stripe Checkout page
            window.location.href = url;
        }
    }

    const onPickupTimeHandler = () => {
        setPickupModal(true)
    }

    return (
        <div className={styles.container}>
            {/* header */}
            <div className='flex border-b border-slate-700'>
                <ChevronLeftIcon onClick={() => navigate(-1)} className="h-6 w-6 mr-2 self-center cursor-pointer" />
                <div>
                    <h4 className='font-bold text-2xl'>我的購物車</h4>
                    <h6>{shopName}</h6>
                    <p>{shopAddress}</p>
                </div>
            </div>
            {/* shopping cart & buttons for edit cart */}
            <div className='overflow-y-auto h-1/3'>
                {Array.isArray(cart) && cart.length > 0 ? cart.map((item) => <ShoppingCartItem key={item.key} item={item} onDelete={()=>onDeleteItemHandler(item.key)} />) : ""}
            </div>
            <div className='border-b border-slate-700'>
                <button className='block mx-auto w-72 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white'
                    onClick={onMenuHandler}>增加産品</button>
                <button className='block mx-auto w-72 my-1.5 border border-dark-brown rounded-2xl font-bold text-red-500'
                    onClick={onSafeClearCartHandler}>清空購物車</button>
                <ConfirmClearCartModal show={safeClearCartModal} onClose={() => setSafeClearCartModal(false)} onDelete={onClearCartHandler} />
            </div>
            {/* Discount & bill total */}
            <div className='border-b border-slate-700'>
                <h6 className='font-bold'>訂單總結</h6>
            </div>
            <div className='border-b border-slate-700'>
                <button className='block mx-auto font-bold text-tahiti'>+ 使用優惠卷</button>
                <button className='block mx-auto font-bold text-tahiti'>+ 使用積分</button>
            </div>
            <div className='w-5/6 mx-auto'>
                <div className='flex justify-around my-1.5'>
                    <h6 className='font-bold'>小計</h6>
                    <p className='font-bold'>${total}</p>
                </div>
                <div className='flex justify-around my-1.5'>
                    <h6 className='font-bold'>總額</h6>
                    <p className='font-bold'>${discountedTotal}</p>
                </div>
                <div></div>
            </div>
            {/* Pickup Time */}
            <div className='border-y border-slate-700'>
                <h6 className='font-bold'>選擇自取時間</h6>
                <button className='flex justify-around mx-auto w-72 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white' onClick={onPickupTimeHandler}>
                    自取時間： {pickupTime} {/*use pickup time in localstorage*/}
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
                <PickupModal show={pickupModal} onClose={() => setPickupModal(false)}></PickupModal>
            </div>
            {/* Checkout */}
            <div className='flex justify-around my-1.5'>
                <div>
                    <h4>訂單總額</h4>
                    <h4>HK$ {discountedTotal}.00</h4>
                </div>
                <button className='border rounded-2xl w-16 border-black' onClick={onCheckoutHandler}>付款</button> {/*color not working*/}
            </div>
        </div>
    )
}
