import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "./store";


export function AuthGuard(){
    const isAuthenticated = useSelector((state:RootState)=> state.auth.isAuthenticated)
    console.log(isAuthenticated)
    if(isAuthenticated){
        return <Outlet/>;
    } else {
        return <Navigate to="/client-login" />;
    }
}