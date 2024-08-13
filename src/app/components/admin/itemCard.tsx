'use client'
import React, { useEffect, useState } from 'react'
import { Item } from '@/app/interface/interface'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import tokenStore from '../../../../store/tokenStore';
import { useRouter } from 'next/navigation';
import { handleErrorToast } from '../../../../lib/handleToast';
import { handleSuccessToast } from '../../../../lib/handleToast';
import Loader from '../loading';

interface CardProp{
    item:Item,
    handleItemsUpdate:(_id:string, quantity:number)=>void;
}

interface IncrementQuantityProps{
    intialQuantity:number;
    quantity:number;
    maxQuantity:number;
    handleQuantity:()=>void;
}

const ItemCard = ({item, handleItemsUpdate}:CardProp) => {
    const router = useRouter()
    const [quantity, setQuantity] = useState(item.available_quantity)
    const [loading, setLoading] = useState(false)
    
    const intialQuantity = item.available_quantity

    const {token} = tokenStore((state)=>({
        token:state.token
    }))

    const maxQuantity = 20
    const handleQuantity = ()=>{
        setQuantity(quantity+1)
    }

    const updateItem = async(_id:string, quantity:number)=>{
        // api call to update item
        setLoading(true)
        const result = await axios.patch("http://localhost:8080/items", {_id, available_quantity:quantity},{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'  // Content type if sending JSON
            }
        })
        if(result.status===200){
          // show toast of success
          handleSuccessToast("Successfully Updated the Quantity")
          handleItemsUpdate(_id, quantity)
        }
        else if(result.status===403){
            handleErrorToast("Session Expired Redirecting to Login page")
            setTimeout(()=>{
                router.push("/admin/login")
            }, 1000)
        }
        else{
          handleErrorToast("Something went wrong Please Retry")
          // show toast of failure
        }
        setLoading(false)
      }

  return (
    <>
    {
        loading?(
            <>
                <Loader />
            </>
        ):(
            <></>
        )
    }
        <div style={{margin:"1rem"}}>
            {/* <Card sx={{padding:"1rem"}}>
            <CardActionArea sx={{height:"200px", backgroundColor:""}}>
                <Box sx={{backgroundColor:"", height:"120px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Box sx={{width:"80px", height:"120px"}}>
                        <img 
                            src="https://th.bing.com/th/id/OIP.eTT3w24Pb9S-JKIIw85AewHaKE?w=132&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
                            alt="Item Image"
                            style={{width:"100%", height:"100%", objectFit:"cover"}}    
                        />
                    </Box>
                </Box>
                <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center"}}>
                    {item.name}
                </Typography>
                
                </CardContent>
            </CardActionArea>
            <>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", margin:"1rem"}}>
                    <Typography>
                        ₹ {item.price}
                    </Typography>
                </Box>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                {
                    intialQuantity === maxQuantity?(
                        <>
                                <Typography variant='h6'>Item Full</Typography>
                        </>
                    ):(
                        <>
                            <IncrementDecrementCount intialQuantity={intialQuantity} quantity={quantity} maxQuantity={maxQuantity} handleQuantity={handleQuantity}  />
                            <Button 
                                onClick={()=>updateItem(item._id, quantity)} 
                                disabled={(intialQuantity===quantity || loading)?true:false}
                                variant='contained'
                            >
                                Done 
                            </Button>
                        </>
                    )
                }
            </Box>
            </>
            </Card> */}
            
        </div>
    </>
  )
}

export default ItemCard

const IncrementDecrementCount = ({intialQuantity, quantity, maxQuantity, handleQuantity}:IncrementQuantityProps)=>{
    const val = quantity
    // console.log(val)
    return (
      <Box sx={{marginLeft:"5px", display:"flex", justifyContent:"space-evenly", alignContent:"center", alignItems:"center"}}>
        <p style={{margin:"5px"}}>{quantity}/{maxQuantity}</p>
        <Button 
            onClick={handleQuantity} 
            disabled={quantity === maxQuantity ?true:false}
        > 
            <AddIcon/> 
        </Button>
      </Box>
    )
  }

