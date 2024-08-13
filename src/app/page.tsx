
'use client'
import { useEffect } from "react";
import tokenStore from "../../store/tokenStore";
import AllItems from "./components/allItems";
import Navbar from "./components/navbars/navbar";
import TotalCost from "./components/totalCost";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const { addToken} = tokenStore((state)=>({
    addToken:state.addToken
  }))
  
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      router.push("/admin/login")
    }
    addToken(token)

  },[])
  return (
    <div>
        <Navbar type={"customer"} />
          <AllItems />
        <TotalCost/>
        <ToastContainer />
    </div>
  );
}
