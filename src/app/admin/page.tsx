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
      <Box sx={{ flexGrow: 1}} >
        {/* <Box sx={{display:"flex", alignItems:"center", justifyContent:"end", margin:"1rem", borderWidth:"2px", borderStyle:"solid"}}>
          <Typography sx={{margin:"1rem", fontWeight:"bold"}}>Click to Add New Items</Typography>
          <Button sx={{margin:"1rem"}} variant='contained' onClick={()=>router.push("/admin/addItem")}>Add Items</Button>
        </Box> */}
              <Grid container spacing={2}>
                      {
                          items.map((item, index)=>{
                              return (
                                  <Grid xs={12} sm={6} md={4} lg={3}>
                                    <ItemCard key={item._id} item={item} handleItemsUpdate={handleItemsUpdate}/>
                                  </Grid>
                              )
                          })
                      }
              </Grid>
          </Box>
    </>
  )
}

export default Page