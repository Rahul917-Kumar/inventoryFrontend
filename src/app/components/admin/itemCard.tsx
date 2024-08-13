'use client'
import React, { useEffect, useState } from 'react'
import { Item } from '@/app/interface/interface'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Tooltip, Typography } from '@mui/material'
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
    handleQuantity:(type:string)=>void;
}

const ItemCard = ({item, handleItemsUpdate}:CardProp) => {
    const router = useRouter()
    const [quantity, setQuantity] = useState(item.available_quantity)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    
    const intialQuantity = item.available_quantity

    const {token} = tokenStore((state)=>({
        token:state.token
    }))

    const maxQuantity = 20
    const handleQuantity = (type:string)=>{
        if(type==="increase"){
            setQuantity(quantity+1)
        }else{
            setQuantity(quantity-1)
        }
    }

    const updateItem = async(_id:string, quantity:number)=>{
        // api call to update item
        setMessage("Updating the Quantity")
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
          setQuantity(item.available_quantity)
        }
        setMessage("")
        setLoading(false)

      }

  return (
    <>
    {
        loading?(
            <>
                <Loader message={message} />
            </>
        ):(
            <></>
        )
    }
        <div>
            <div className='card flexElements' style={{height: "23rem"}}>
          <div className='flexElementsRow'>
            <div className='imageCardContainer'>
              {/* image */}
              <img 
                  src={item.display_image_url} 
                  alt="Item Image"
                  style={{width:"100%", height:"100%", objectFit:"contain", boxShadow:"0 4px 2px -2px rgba(0, 0, 0, 0.2)"}}    
                  
              />
            </div>
          </div>
          <div style={{backgroundColor:"", padding:"0.5rem", textAlign:"center"}}>
            <Typography variant='h5' sx={{fontWeight:"bold"}}> {item.name} </Typography>
            <Typography sx={{fontWeight:"400", margin:"0.5rem 0 0.5rem 0", fontSize:"1.4rem"}}>₹ {item.price}</Typography>
          </div>
          
                    <div >
                      <IncrementDecrementCount intialQuantity={intialQuantity} quantity={quantity} maxQuantity={maxQuantity} handleQuantity={handleQuantity}  />
                    </div>
                    <div className='addItemDiv' style={{padding:"1rem", cursor:(intialQuantity===quantity || loading)?"not-allowed":"pointer",
                        backgroundColor:(intialQuantity===quantity || loading)?"gray":"#1565c0"
                     }}
                     onClick={() => {
                        if (intialQuantity !== quantity && !loading) {
                          updateItem(item._id, quantity);
                        }
                      }}
                    >
                        Done 
                    </div>
        </div>
        </div>
    </>
  )
}

export default ItemCard

const IncrementDecrementCount = ({intialQuantity, quantity, maxQuantity, handleQuantity}:IncrementQuantityProps)=>{
    return (
      <Box sx={{marginLeft:"5px", display:"flex", justifyContent:"space-evenly", alignContent:"center", alignItems:"center"}}>
        <Tooltip title="Decrease Quantity">
            <Button onClick={()=>handleQuantity("decrease")}
                disabled={quantity === intialQuantity ?true:false}
                sx={{color: quantity === intialQuantity ? '#A9A9A9' : 'blue', fontSize:"2rem"}} > 
                <RemoveIcon/> 
            </Button>
        </Tooltip>
        <p style={{margin:"5px",fontSize:"1.3rem"}}>{quantity}/{maxQuantity}</p>
        <Tooltip title="Increase Quantity">
            <Button 
                onClick={()=>handleQuantity("increase")} 
                disabled={quantity === maxQuantity ?true:false}
            > 
                <AddIcon sx={{color: quantity === maxQuantity ? '#A9A9A9' : 'blue', fontSize:"2rem"}}/> 
            </Button>
        </Tooltip>
      </Box>
    )
  }

