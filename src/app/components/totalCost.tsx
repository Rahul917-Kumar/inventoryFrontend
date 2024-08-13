'use client'

import React from 'react'
import itemStore from '../../../store/itemsStore'
import { Button, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartModal from './modals/cartModal';

const TotalCost = () => {
    const {totalAmount} = itemStore((state)=>({
        totalAmount:state.totalAmount,
    }))
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div 
            style={{
                position:"fixed",
                bottom:0,
                left:0,
                backgroundColor:"white",
                height:"70px",
                width:"100vw",
                boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.5)",
                padding:"5px",
            }}
        >
            <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center", marginRight:"3rem"}}>
                <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
                    <Typography style={{margin:"1rem"}} variant='h6'>Total Amount: ₹</Typography>
                    <Typography variant='h5'>{totalAmount}</Typography>
                </div>
                <Button
                    variant='contained'
                    disabled={totalAmount===0?true:false} 
                    sx={{margin:"1rem", fontSize:"1rem"}}
                    onClick={handleClickOpen}
                >
                        Cart 
                        <ShoppingCartIcon  sx={{margin:"5px"}}/>
                </Button>
            </div>
            <CartModal open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </div>
    )
}

export default TotalCost
