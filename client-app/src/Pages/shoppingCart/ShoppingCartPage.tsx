import React from 'react'
import styles from './ShoppingCartPage.module.css'
import { Fragment, useState } from 'react'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { PickupModal } from '../../components/Modal';

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { Navigate, useNavigate } from 'react-router';

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

export default function ShoppingCartPage() {
    // const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    // const shop = useSelector((state: RootState) => state.shoppingCart.shop)
    // const itemsToBuy = useSelector((state: RootState) => state.shoppingCart.itemList)
    const itemsToBuy = JSON.parse(localStorage.getItem("shoppingCart")as string) || undefined

    const [discount, setDiscount] = useState(false)
    const [rewardPoint, setRewardPoint] = useState(false)
    const [pickupModal, setPickupModal] = useState(false);

    const onMenuHandler = () => {
        navigate("/")
    }

    const onRemoveCartHandler = () => {
        localStorage.removeItem("shoppingCart")
    }

    const onPaymentHandler = () => {

    }

    const onPickupTimeHandler = () => {
        setPickupModal(true)
    }

    return (
        <div className={styles.container}>
            <div className='flex border-b border-slate-700'>
                <ChevronLeftIcon className="h-6 w-6 mr-2 self-center" />
                <div>
                    <h4 className='font-bold text-2xl'>我的購物車</h4>
                    <h6>Blue Bottle Coffee</h6>
                    <p>中環擺花街38號地舖及1樓</p>
                </div>
            </div>
            <div>
                {itemsToBuy? itemsToBuy:""}
            </div>
            <div className='border-b border-slate-700'>
                <button className='block mx-auto w-72 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white'
                onClick={onMenuHandler}>增加産品</button>
                <button className='block mx-auto w-72 my-1.5 border border-dark-brown rounded-2xl font-bold text-red-500'
                onClick={onRemoveCartHandler}>清空購物車</button> 
            </div>
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
                    <p className='font-bold'>$34</p>
                </div>
                <div className='flex justify-around my-1.5'>
                    <h6 className='font-bold'>總額</h6>
                    <p className='font-bold'>$34</p>
                </div>
                <div></div>
            </div>
            <div className='border-y border-slate-700'>
                <h6 className='font-bold'>選擇自取時間</h6>
                <button className='flex justify-around mx-auto w-72 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white' onClick={onPickupTimeHandler}>
                    自取時間： 10 : 00 {/*use pickup time in localstorage*/}
                    <ChevronRightIcon className="h-6 w-6"/>
                </button>
                <PickupModal show={pickupModal} onClose={()=>setPickupModal(false)}></PickupModal>
            </div>
            <div className='flex justify-around my-1.5'>
                <div>
                    <h4>訂單總額</h4>
                    <h4>HK$ 34.00</h4> {/*color not working*/}
                </div>
                <button className='border rounded-2xl w-16 border-black' onClick={onPaymentHandler}>付款</button> {/*color not working*/}
            </div>
        </div>
    )
}
