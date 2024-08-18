'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ItemCard from './itemCard'
import { Item } from '../interface/interface'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material'
import { handleSuccessToast } from '../../../lib/handleToast'
import { handleErrorToast } from '../../../lib/handleToast'
import Loader from './loading'
const AllItems = () => {
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(false)
    const getAllItems = async()=>{
        setLoading(true)
        const result = await axios.get("https://inventorybackend-ytw9.onrender.com/items")
        if(result.status === 200){
            setItems([...result.data])
        }else{
            handleErrorToast("something went wrong")
        }
        setLoading(false)
    }
    useEffect(()=>{
        // call api to get all items
        getAllItems()
    },[])

    return (
        <>
        <Loader message={""} open={loading} />
            <Box sx={{  marginBottom:"100px"}}>
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
                                <ItemCard key={item._id} item={item}/>
                            )
                        })
                }
                </Box>
            </Box>
        </>
    )
}

export default AllItems
