import { Typography } from '@mui/material';
import React from 'react'

interface ItemDetailProps{
    name:string;
    price:number;
    available_quantity:number;
}

const ItemDetail = ({name, price, available_quantity}:ItemDetailProps) => {
  return (
    <>
        <div style={{ display:"flex", margin:"0.6rem 0 0.6rem 0 ",alignItems:"flex-end", height:"4.5rem"}}>
        <Typography variant='h5' sx={{fontWeight:"500", letterSpacing:"1px", margin:"0.4rem"}}> {name} </Typography>
        </div>
            <div className='quantityAndItemLeft' style={{margin:"0.4rem"}}>
            <Typography sx={{fontWeight:"450", fontSize:"1.4rem"}}>₹ {price}</Typography>
            <Typography sx={{fontSize:"0.8rem", color:"blue"}}>current quant: <span style={{fontWeight:"bold"}}>{available_quantity}</span> </Typography>
        </div>
    </>
  )
}

export default ItemDetail
