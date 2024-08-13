import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const Loader = ({message}:{message?:string | undefined}) => {
  return (
    <Box 
        sx={{
            display: 'flex',
            alignItems:"center",
            justifyContent:"center",
            zIndex:"9999",
            width:"100%",
            height:"100%",
            position:"fixed",
            top:"0",
            left:"0",
            backgroundColor:"rgba(0, 0, 0, 0.5)"
        }}
    >
        <Box
            sx={{
                display: 'flex',
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column"
            }}
        >
        <Typography sx={{color:"white", margin:"1rem"}}>{message}</Typography>
        <CircularProgress  />
        </Box>
    </Box>
  )
}

export default Loader
