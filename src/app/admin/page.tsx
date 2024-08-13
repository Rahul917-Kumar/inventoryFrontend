'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Item } from '../interface/interface'
import axios from 'axios'
import ItemCard from '../components/admin/itemCard'
import { Box, Button, Grid, Typography } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import Navbar from '../components/navbars/navbar'
import tokenStore from '../../../store/tokenStore'
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const {addToken} = tokenStore((state)=>({
    addToken:state.addToken
  }))
  const getAllItems = async()=>{
    const result = await axios.get("http://localhost:8080/items")
    console.log(result.data)
    setItems([...result.data])
  }

  const handleItemsUpdate = (_id:string, quantity:number)=>{
    let tempItems  = items.map((item)=>{
      if(item._id == _id){
        item.available_quantity = quantity
        return item
      }else{
        return item
      }
    })
    setItems([...tempItems])
  }

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      console.log("Please Login, redirecting to login page")
      router.push("/admin/login")
    }
    getAllItems()
    addToken(token)

  },[])
  return (
    <>
    <Navbar type={"admin"}/>
      <ToastContainer />
          <Box>
            <Box
                sx={{
                    display:"flex", 
                    justifyContent:"flex-start",
                    alignItems:"center",
                    flexWrap:"wrap",
                }}
            >
            {
                    items.map((item, index)=>{
                        return (
                               <ItemCard key={item._id} item={item} handleItemsUpdate={handleItemsUpdate}/>
                        )
                    })
            }
            </Box>
        </Box>
    </>
  )
}

export default Page