import { Fragment, useState } from 'react'
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

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
    const [open, setOpen] = useState(true)

    return (
        <>
            <div className='flex border-b border-slate-700'>
                <ChevronLeftIcon className="h-6 w-6"/>
                <div>
                    <h4>我的購物車</h4>
                    <h6>Blue Bottle Coffee</h6>
                    <p>中環擺花街38號地舖及1樓</p>
                </div>
            </div>
            <div>
                {}
            </div>
            <div className='border-b border-slate-700'>
                <button className='block mx-auto w-72 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white'>增加産品</button>
                <button className='block mx-auto w-72 my-1.5 border border-dark-brown rounded-2xl font-bold text-red'>清空購物車</button> {/*color not working*/}
            </div>
            <div className='border-b border-slate-700'>
                <h6 className='font-bold'>訂單總結</h6>
            </div>
            <div className='border-b border-slate-700'>
                <a href="" className='block text-center'>+ 使用優惠卷</a> {/*color not working*/}
                <a href="" className='block text-center'>+ 使用積分</a> {/*color not working*/}
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
                <button className='flex justify-around mx-auto w-72 my-1.5 bg-gradient-to-r from-light-brown to-dark-brown rounded-2xl font-bold text-white'>
                    自取時間： 17:30
                    <ChevronRightIcon className="h-6 w-6"/>
                </button>
            </div>
            <div className='flex justify-around my-1.5'>
                <div>
                    <h4>訂單總額</h4>
                    <h4>HK$ 34.00</h4> {/*color not working*/}
                </div>
                <button className='border rounded-2xl w-16 border-black'>付款</button> {/*color not working*/}
            </div>
        </>
        // <Transition.Root show={open} as={Fragment}>
        //     <Dialog as="div" className="relative z-10" onClose={setOpen}>

        //         <div className="fixed inset-0 overflow-hidden">
        //             <div className="absolute inset-0 overflow-hidden">
        //                 <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        //                     <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
        //                         <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        //                             <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        //                                 <div className="flex items-start justify-between">
        //                                     <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
        //                                     <div className="ml-3 flex h-7 items-center">
        //                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        //                                             <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        //                                         </svg>


        //                                         <button
        //                                             type="button"
        //                                             className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
        //                                         >
        //                                             <span className="absolute -inset-0.5" />
        //                                             <span className="sr-only">Close panel</span>
        //                                             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        //                                         </button>
        //                                     </div>
        //                                 </div>

        //                                 <div className="mt-8">
        //                                     <div className="flow-root">
        //                                         <ul role="list" className="-my-6 divide-y divide-gray-200">
        //                                             {products.map((product) => (
        //                                                 <li key={product.id} className="flex py-6">
        //                                                     <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        //                                                         <img
        //                                                             src={product.imageSrc}
        //                                                             alt={product.imageAlt}
        //                                                             className="h-full w-full object-cover object-center"
        //                                                         />
        //                                                     </div>

        //                                                     <div className="ml-4 flex flex-1 flex-col">
        //                                                         <div>
        //                                                             <div className="flex justify-between text-base font-medium text-gray-900">
        //                                                                 <h3>
        //                                                                     <a href={product.href}>{product.name}</a>
        //                                                                 </h3>
        //                                                                 <p className="ml-4">{product.price}</p>
        //                                                             </div>
        //                                                             <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        //                                                         </div>
        //                                                         <div className="flex flex-1 items-end justify-between text-sm">
        //                                                             <p className="text-gray-500">Qty {product.quantity}</p>

        //                                                             <div className="flex">
        //                                                                 <button
        //                                                                     type="button"
        //                                                                     className="font-medium text-indigo-600 hover:text-indigo-500"
        //                                                                 >
        //                                                                     Remove
        //                                                                 </button>
        //                                                             </div>
        //                                                         </div>
        //                                                     </div>
        //                                                 </li>
        //                                             ))}
        //                                         </ul>
        //                                     </div>
        //                                 </div>
        //                             </div>

        //                             <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        //                                 <div className="flex justify-between text-base font-medium text-gray-900">
        //                                     <p>Subtotal</p>
        //                                     <p>$262.00</p>
        //                                 </div>
        //                                 <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        //                                 <div className="mt-6">
        //                                     <a
        //                                         href="#"
        //                                         className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        //                                     >
        //                                         Checkout
        //                                     </a>
        //                                 </div>
        //                                 <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        //                                     <p>
        //                                         or{' '}
        //                                         <button
        //                                             type="button"
        //                                             className="font-medium text-indigo-600 hover:text-indigo-500"
        //                                             onClick={() => setOpen(false)}
        //                                         >
        //                                             Continue Shopping
        //                                             <span aria-hidden="true"> &rarr;</span>
        //                                         </button>
        //                                     </p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </Dialog.Panel>
        //                 </div>
        //             </div>
        //         </div>
        //     </Dialog>
        // </Transition.Root>
    )
}
