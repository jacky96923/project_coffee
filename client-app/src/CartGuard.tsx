import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { RootState } from "./store";
import { useEffect, useState } from "react";
import { NoShoppingCartModal } from "./components/Modal";


export function CartGuard(){
    const navigate = useNavigate()
    const [cartAccess, setCartAccess] = useState(false)
    const [noShoppingCartModal, setNoShoppingCartModal] = useState(true)
    useEffect(()=>{
    console.log("cartAccess before checking", cartAccess)
    let shoppingCartPageData = JSON.parse(localStorage.getItem("shoppingCart") as string) || undefined;
    if (shoppingCartPageData !== undefined){
      setCartAccess(true)
    }
    console.log("cartAccess after checking", cartAccess)

    }, [cartAccess])

    if(cartAccess){
        return <Outlet/>;
    } else {
        return (<><NoShoppingCartModal show={noShoppingCartModal} onClose={()=>{setNoShoppingCartModal(false);}}/>
        {noShoppingCartModal? "":navigate(-1)}</>
    )}
}

