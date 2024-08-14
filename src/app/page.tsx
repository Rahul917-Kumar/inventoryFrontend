
'use client'
import { useEffect } from "react";
import tokenStore from "../../store/tokenStore";
import AllItems from "./components/allItems";
import Navbar from "./components/navbars/navbar";
import TotalCost from "./components/totalCost";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div>
        <Navbar type={"customer"} />
          <AllItems />
        <TotalCost/>
        <ToastContainer />
    </div>
  );
}
