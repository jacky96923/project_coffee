import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "./store";


export function AuthGuard(){
    const isAuthenticated: string | undefined = useSelector((state:RootState)=> state.auth.isAuthenticated)
    console.log(isAuthenticated)
    if(isAuthenticated === "client"){
        return <Outlet/>;
    } else {
        return <Navigate to="/client-login" />;
    }
}