import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
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
      <CircularProgress  />
    </Box>
  )
}

export default Loader
