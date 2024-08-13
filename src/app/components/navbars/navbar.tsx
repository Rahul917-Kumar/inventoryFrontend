'use client'
import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Logo from "../../../../public/logoImage2.png"
import Image from 'next/image';

const Navbar = ({type}:{type:string}) => {
  const router = useRouter()
  const [tokenPresent, setTokenPresent] = useState(false)
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    router.push("/admin/login")
  }
  const handleLogin = ()=>{
    router.push("/admin/login")
  }
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      setTokenPresent(true)
    }

  },[])
  return (
    <Box sx={{ flexGrow: 1, marginBottom:"1rem" }}>
      <AppBar position="static" sx={{backgroundColor:"white"}}>
        <Toolbar>
          <Box sx={{cursor:"pointer", color:"blue", flexGrow:"1"}}
              onClick={()=>{
                if(type==="admin"){
                  router.push("/admin")
                }else{
                  router.push("/")
                }
              }}
              >
            <Image src={Logo} width={100} height={50} alt="LoGo" />
          </Box> 
          {
            type==="admin"?(
              <>
                  {
                    tokenPresent?(
                    <>
                        <Button sx={{margin:"1rem"}} variant='outlined' onClick={()=>router.push("/admin/addItem")}>Add Items</Button>
                        <Button  sx={{color:"white", marign:"1rem" }} onClick={handleLogout} variant='contained'>Logout</Button>
                    </>
                      ):(
                        <>
                          <Button  sx={{color:"#1565c0" }} onClick={handleLogin} variant='outlined'>Login</Button>
                        </>
                      )
                  }
              </>
            ):(
              <>

              </>
            )
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
