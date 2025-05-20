import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function ProtectedRoutes({children}) {
    const {user} = useSelector(state => state.auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!user || user.role!=="recruiter"){
            navigate("/");
        }
    },[])
    return ( 
        <>
        {children}
        </>
     )
}

export default ProtectedRoutes;