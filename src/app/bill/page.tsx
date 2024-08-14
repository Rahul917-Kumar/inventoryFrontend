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
import { Button, Divider, Tooltip, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navbars/navbar'
import VerifiedIcon from '@mui/icons-material/Verified';

const CartPage = () => {
    const router = useRouter()
    const { billAmount, billItems} = itemStore((state)=>({
        billAmount:state.billAmount,
        billItems:state.billItems
      }))


        return (
            <>
            <Navbar type={"customer"} />
            <div 
                className='billShowDiv'
            >
                <div
                    className='finalPurchaseDiv'
                >
                    <div
                       style={{textAlign:"center"}} 
                    >
                        <VerifiedIcon  sx={{color:"green", fontSize:"5rem"}}/>

                        <Typography sx={{color:"green", fontSize:"1.7rem"}}>
                            Payment Successfull
                        </Typography>
                        {/* payment successfull icon and text */}
                    </div>
                    <div
                        className='itemListBill'
                    >
                        {/* table of purchase items */}
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
                                    billItems.map((item)=>{
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
                                    <TableCell align="right" sx={{fontWeight:"bold"}}> ₹ {billAmount}</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <Divider></Divider>
                    <div>
                        {/* button for order again */}
                        <Button
                            onClick={()=>{
                                router.push("/")
                            }}
                            variant='contained'
                            sx={{margin:"1rem"}}
                        >
                            Order Again
                        </Button>
                    </div>
                </div>
                
            </div>
            </>
        )
}

export default CartPage
