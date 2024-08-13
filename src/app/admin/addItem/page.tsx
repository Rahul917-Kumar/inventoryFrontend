'use client'
import { Box, Button, Card, CardContent, CardMedia, Divider, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/loading';
import { handleErrorToast } from '../../../../lib/handleToast';
import { handleSuccessToast } from '../../../../lib/handleToast';
import 'react-toastify/dist/ReactToastify.css';
import tokenStore from '../../../../store/tokenStore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Navbar from '@/app/components/navbars/navbar';

interface NewItem{
    name:string;
    quantity:string;
    price:string;
    image_url?:string;
}

interface ModalProps{
    open:boolean;
    addItem:(name:string, quantity:string, price:string, image_url:string)=>void;
    handleCloseModal:()=>void;
}

interface DisplayAddedItemProps{
    items:NewItem[]
}

const AddItem = () => {
  const router = useRouter()
  const [newItems, setNewItems] = useState<NewItem[]>([] as NewItem[]) 
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState<NewItem>({} as NewItem)
  const [loading, setLoading] = useState(false)
  const {token} = tokenStore((state)=>({
    token:state.token
  }))
  const addItem = (name:string, quantity:string, price:string, image_url:string)=>{
    // after adding item close modal
    console.log(name, quantity, price, image_url)
    if(image_url.length===0){
        setNewItems([{name, quantity, price}, ...newItems])
    }else{
        setNewItems([{name, quantity, price, image_url}, ...newItems])
    }
    handleCloseModal()
  }

  const handleAddItemToInventory = async()=>{
        setLoading(true)
        console.log("updating item")
        const tempItems = newItems.map((item)=>{
            if(item.image_url){
                return {name:item.name, price:Number(item.price), available_quantity:Number(item.quantity), display_image_url:item.image_url}
            }else{
                return {name:item.name, price:Number(item.price), available_quantity:Number(item.quantity)}
            }
        }) 

        const result = await axios.post("http://localhost:8080/items", tempItems,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        )
        console.log(result)
        if(result.status===200){
            setNewItems([])
            handleSuccessToast("Successfully added Items to Inventory")
            setTimeout(()=>{
                router.push("/admin")
            }, 1000)
        }
        else if(result.status===403){
            handleErrorToast("Session Expired Redirecting to Login page")
            setTimeout(()=>{
                router.push("/admin/login")
            }, 1000)
        }
        else{
            handleErrorToast("Something went wrong try again")
        }
        setLoading(false)
  }

  const handleOpenModal = ()=>{
    setOpen(true)
  }
  const handleCloseModal = ()=>{
    setOpen(false)
  }

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      router.push("/admin/login")
    }
  },[])

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
         <ToastContainer />
         <Navbar type={"admin"} />
        <Box sx={{display:"flex",
                    justifyContent:"center", 
                    width:"100vw", 
                    height:"100vh", 
                    alignItems:"center",
                    backgroundColor:"grey"
                }}>
            <Box sx={{width:"900px", height:"95vh", backgroundColor:"white", borderWidth:"1px",
                    borderStyle:"solid",
                    borderRadius:"10px",
                    padding:"5px"}}>
                <Box sx={{textAlign:"center"}}>
                <Typography variant='h5'>Add Items To Inventory</Typography>
                    <Tooltip title="Add Item">
                        <Button sx={{}} onClick={handleOpenModal} >
                            <AddCircleIcon sx={{fontSize:"2rem"}} />
                        </Button>
                    </Tooltip>
                </Box>
                {/* <Box sx={{height:"79vh",maxHeight:"70vh", overflowY:"auto", display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"center"}}> */}
                    {
                        /* list of added itema and also show the edit button to update the item */
                /*         newItems.map((item)=>{
                            return (
                                <>
                                    <DisplayAddedItem item={item} />
                                </>
                            )
                         })
                    */
                    }

                {/* </Box> */}
                <DisplayAddedItem  items={newItems} />
                <AddNewItemModal  open={open} addItem={addItem} handleCloseModal={handleCloseModal} />
                <Divider></Divider>
                <Box sx={{textAlign:"right", margin:"1rem 0 1rem 0"}}>
                    <Button variant='contained' onClick={handleAddItemToInventory}
                        disabled={newItems.length===0?true:false}
                    >Update</Button>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default AddItem

const DisplayAddedItem = ({items}:DisplayAddedItemProps)=>{
    return (
        <>
            {/* <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", height:"80px", width:"70%",
                backgroundColor:"",
                margin:"1rem",
                borderWidth:"1px",
                borderStyle:"solid",
                borderRadius:"3px",
                padding:"10px"
            }}>
                <Box sx={{ height:"70px", borderRadius:"10px"}}>
                    <img 
                        src={item.image_url} 
                        alt="Item Image"
                        style={{width:"100%", height:"100%", objectFit:"cover"}}    
                    />
                </Box>
                <Box sx={{textAlign:"left"}}>
                    <Typography>Name: {item.name}</Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                    <Typography>Price: {item.price}</Typography>
                </Box>
            </Box>
            <Divider></Divider> */}
              <TableContainer sx={{height:"79vh",maxHeight:"70vh", overflowY:"auto", display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"center"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Item Image</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h6">
                                Item Name
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h6">
                                Item Quantity
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h6">
                                Item Price
                            </Typography>
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.map((item, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                                <Box sx={{ height:"90px", width:"70px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <img 
                                        src={item.image_url} 
                                        alt="Item Image"
                                        style={{width:"100%", height:"100%", objectFit:"cover"}}    
                                    />
                                </Box>
                        </TableCell>
                        <TableCell align="right">{item.name}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </>
    )
}

const  AddNewItemModal = ({open, addItem, handleCloseModal }:ModalProps)=> {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
    const [image_url, setImageUrl] = useState("")
    const [errorQuant, setErrorQuant] = useState("")
    const [errorPrice, setErrorPrice] = useState("")
    const [loading, setLoading] = useState(false)

    // message

    const handleAddItem = ()=>{
        if(!name || !quantity || !price){
            handleErrorToast("Please Fill all the details ")
            return 
        }
        // console.log(image_url)
        addItem(name, quantity, price, image_url)
        setImageUrl("")
        setName("")
        setQuantity("")
        setPrice("")
    }

    const handleQuantity = (e:any)=>{
        const newQuantity = e.target.value
        if(isNaN(newQuantity)){
            setErrorQuant("Only Numbers are allowed")
        }else{
            if(Number(newQuantity)<=20){
                setQuantity(newQuantity)
                setErrorQuant("")
            }else{
                setErrorQuant("Max 20 Allowed")
            }
        }
    }
    const handlePrice = (e:any)=>{
        const newPrice = e.target.value
        if(isNaN(newPrice)){
            setErrorPrice("Only Numbers are allowed")
        }else{
            setPrice(newPrice)
            setErrorPrice("")
        }
    }
    // show loader to upload image as soon as it is selected
    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        if (e.target.files && e.target.files.length > 0) {
            const data = new FormData()
            data.append("file", e.target.files[0])
            data.append("upload_preset", "vendingImage")
            data.append("cloud_name", "de7fldt0n")
            const result = await axios.post("https://api.cloudinary.com/v1_1/de7fldt0n/image/upload", data)
            if(result.status ===200){
                setImageUrl(result.data.secure_url)
                handleSuccessToast("Successfully uploaded Image")
            }else{
                handleErrorToast("Something went wrong try again")
            }
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
        <Dialog
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box sx={{textAlign:"center", width:"400px", padding:"1rem"}}>
            <DialogTitle id="alert-dialog-title">
                Provide Details of Item
            </DialogTitle>
            <TextField 
                label="Item Name" 
                variant='outlined' 
                sx={{margin:"1rem 0 1rem 0"}} 
                fullWidth 
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <TextField 
                label="Quantity" 
                variant='outlined' 
                // type='number' 
                sx={{margin:"1rem 0 1rem 0"}}
                fullWidth 
                value={quantity}
                helperText={errorQuant.length>0?errorQuant:""}
                onChange={(e)=>handleQuantity(e)}
            />
            <TextField 
                label="Price" 
                variant='outlined' 
                // type='number' 
                value={price}
                sx={{margin:"1rem 0 1rem 0"}} 
                fullWidth
                helperText={errorPrice.length>0?errorPrice:""}
                onChange={(e)=>handlePrice(e)} 
            />
            <input type="file" 
                onChange={(e)=>handleFileChange(e)}  
            />
          </Box>
          <DialogActions>
            <Button onClick={handleAddItem} variant='contained'>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }