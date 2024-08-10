'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ItemCard from './itemCard'
import { Item } from '../interface/interface'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material'

const AllItems = () => {
    const [items, setItems] = useState<Item[]>([])
    useEffect(()=>{
        // call api to get all items
        const getAllItems = async()=>{
            const result = await axios.get("http://localhost:8080/items")
            console.log(result.data)
            setItems([...result.data])
        }
        getAllItems()
    },[])
    return (
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2}>
                    {
                        items.map((item, index)=>{
                            return (
                                <Grid xs={12} sm={6} md={4} lg={3}>
                                   <ItemCard key={index} item={item}/>
                                </Grid>
                            )
                        })
                    }
            </Grid>
        </Box>
    )
}

export default AllItems
