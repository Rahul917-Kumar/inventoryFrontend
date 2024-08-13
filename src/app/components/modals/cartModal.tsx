import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import itemStore from '../../../../store/itemsStore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { addedItem } from '../../../../store/itemsStore';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation'

interface CartProps{
    open:boolean;
    handleClickOpen:()=>void;
    handleClose:()=>void;
}

interface TableProps{
    items:addedItem[],
    totalAmount:number,
}

const CartModal = ({open, handleClickOpen, handleClose}:CartProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {totalAmount, items, clearItems, clearAmount, addBillAmount, addBillItems} = itemStore((state)=>({
        totalAmount:state.totalAmount,
        items:state.items,
        clearItems:state.clearItems,
        clearAmount:state.clearAmount,
        addBillAmount:state.addBillAmount,
        addBillItems:state.addBillItems
    }))
    const handlePayment = async()=>{
        console.log("items from total cost", items)
        setLoading(true)
        const result = await axios.patch("http://localhost:8080/items/bulkUpdate",items)
        if(result.status === 200){
            handleSuccessToast()
            handleClose()
            addBillAmount(totalAmount)
            addBillItems(items)
            clearAmount()
            clearItems()
            router.push("/bill")
        }else{
            handleErrorToast()
            handleClose()
        }
        setLoading(false)
    }
    const handleSuccessToast = ()=>{
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
    }

    const handleErrorToast = ()=>{
        toast.error('Something Went Wrong', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{textAlign:"center"}}>
                    Cart
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <ShowSelectedItemsQuantity 
                        items={items} 
                        totalAmount={totalAmount}
                    />
                </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handlePayment} variant='contained' disabled={loading}>Pay</Button>
                </DialogActions>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Dialog>   
        </>
    )
}


const ShowSelectedItemsQuantity = ({items, totalAmount}:TableProps)=>{
    return (
        <>
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
                    <>    
                        <TableCell component="th" scope="row" sx={{fontWeight:"bold"}}>
                            Total Amount:
                        </TableCell>
                        <TableCell align="right" sx={{fontWeight:"bold"}}> ₹ {totalAmount}</TableCell>
                    </>
                    </TableBody>
                </Table>
                </TableContainer>
        </>
    )
}

export default CartModal