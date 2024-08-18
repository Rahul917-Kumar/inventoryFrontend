'use client'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Box, Divider, Typography} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import tokenStore from '../../../../store/tokenStore';
import { handleSuccessToast } from '../../../../lib/handleToast';
import { handleErrorToast } from '../../../../lib/handleToast';
import Loader from '@/app/components/loading';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/app/components/navbars/navbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const {addToken} = tokenStore((state)=>({
    addToken:state.addToken
  }))
  const handleLogin = async()=>{
    if(!email || !password){
      handleErrorToast("Please Fill All the Required Details")
      return 
    }
    setLoading(true)
    const result = await axios.post("https://inventorybackend-ytw9.onrender.com/user/login", {email, password})
    console.log(result)
    if(result.status===200){
      localStorage.setItem("token", result.data.token)
      addToken(result.data.token)
      handleSuccessToast("Successfully loggedIn")
      setTimeout(()=>{
        router.push("/admin")
      }, 500)
    }else{
      handleErrorToast("Something went wrong try again")
    }
    setLoading(false)
  }

  return (
    <>
    <Loader open={loading}/>
    <ToastContainer />
    <Navbar type={"admin"}/>
      <Box
        sx={{
          display:"flex",
          width:"100vw",
          height:"80vh",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        <Box 
          sx={{
            width:"400px",
            borderWidth:"1px",
            borderStyle:"solid",
            borderColor:"#1565c0",
            padding:"1rem",
            borderRadius:"10px",
            boxShadow: "10px 10px 50px #202020"           
          }}
        >
          <Box
              sx={{
                textAlign:"center",
              }}          
          >
            <AccountCircleIcon 
              sx={{
                fontSize:"7rem",
                color:"#1565c0",
              }}
            />
          </Box>
          <Box>
            {/* add user icon */}
            <Typography variant='h4' sx={{
              textAlign:"center"
            }}>
              Sign In
            </Typography>
          </Box>
          <Box>
            <TextField  
                  label="Email" 
                  variant="outlined" 
                  sx={{margin:"1rem 0 1rem 0"}} 
                  fullWidth
                  onChange={(e)=>setEmail(e.target.value)}
              />
              <TextField  
                  label="Password" 
                  type='password' 
                  variant="outlined" 
                  sx={{margin:"1rem 0 1rem 0"}} 
                  fullWidth 
                  onChange={(e)=>setPassword(e.target.value)}
              />
          </Box>
          <Divider />
          <Box 
            sx={{
              textAlign:"right"
            }}
          >
              <Button variant='contained' sx={{margin:"0.5rem"}} onClick={handleLogin}>Login</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default LoginPage
