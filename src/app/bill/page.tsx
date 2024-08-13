'use client'
import React, { useEffect, useState } from 'react'
import itemStore from '../../../store/itemsStore'
import { toast } from 'react-toastify'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Tooltip, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
    const router = useRouter()
    
    const {totalAmount, items, clearItems, clearAmount} = itemStore((state)=>({
        totalAmount:state.totalAmount,
        items:state.items,
        clearItems:state.clearItems,
        clearAmount:state.clearAmount
      }))

        const handleStates = ()=>{
            clearAmount()
            clearItems()
            router.push("/")
        }


        useEffect(()=>{
            toast.success('Payment Successfull', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },[])

        return (
            <div
                style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                }}
            >
                <div
                    style={{
                        width:"500px"
                    }}
                >
                    <Tooltip title="Go Back">
                        <Button onClick={()=>handleStates()} > <ArrowBackIcon sx={{margin:"1rem"}}/> Order Again </Button>
                    </Tooltip>
                    <Typography variant="h5" sx={{textAlign:"center", margin:"1rem"}}>Payment Successfull</Typography>
                    <Typography variant="h6" sx={{textAlign:"center"}}>Thankyou for your purchase</Typography>
                    <TableContainer>
                    <Table sx={{ minWidth:350 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            items.map((item)=>{
                                return (
                                    <>
                                        <TableRow>    
                                            <TableCell component="th" scope="row">
                                                {item.name}
                                            </TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                        }    
                        <TableRow>
                            <TableCell component="th" scope="row" sx={{fontWeight:"bold"}}>
                                Total Amount:
                            </TableCell>
                            <TableCell align="right" sx={{fontWeight:"bold"}}> ₹ {totalAmount}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            </div>
        )
}

export default CartPage
