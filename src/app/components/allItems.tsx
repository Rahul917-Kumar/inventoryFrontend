'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ItemCard from './itemCard'
import { Item } from '../interface/interface'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material'

const AllItems = () => {
    const [items, setItems] = useState<Item[]>([])
    const getAllItems = async()=>{
        const result = await axios.get("http://localhost:8080/items")
        console.log(result.data)
        setItems([...result.data])
    }
    useEffect(()=>{
        // call api to get all items
        getAllItems()
    },[])

    return (
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
    )
}

export default AllItems
