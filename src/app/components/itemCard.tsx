'use client'

import React, { useState } from 'react'
import { Item } from '../interface/interface'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface ItemCardProps {
  item: Item;
}

interface AddItem{
  itemCount:number;
  setItemCount:React.Dispatch<React.SetStateAction<number>>;
  available_quantity:number;
}

const ItemCard = ({item}:ItemCardProps) => {
  const [itemCount, setItemCount] = useState(0)
  return (
    <div>
        <Card >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://th.bing.com/th/id/OIP.eTT3w24Pb9S-JKIIw85AewHaKE?w=132&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center"}}>
                {item.name}
              </Typography>
              
            </CardContent>
          </CardActionArea>
          <>
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <Typography>
                    ₹ {item.price}
                  </Typography>
                  {
                    itemCount ===0?(
                      <>
                        <Button 
                            variant='contained' 
                            sx={{padding:"4px", marginLeft:"1rem"}}
                            onClick={()=>setItemCount(itemCount+1)}
                        >
                            ADD
                        </Button>
                      </>
                    ):(
                      <>
                          <IncrementDecrementCount itemCount={itemCount} setItemCount={setItemCount} available_quantity={item.available_quantity} />
                      </>
                    )
                  }
              </Box>
          </>
          <CardActions>
            {/* <Button size="small" color="primary">
              Share
            </Button> */}
          </CardActions>
        </Card>

        {/* show edit button for the admin*/}

    </div>
  )
}

export default ItemCard


const IncrementDecrementCount = ({itemCount, setItemCount, available_quantity}:AddItem)=>{
  const decrementCount = ()=>{
    if(itemCount!==0){
      setItemCount(itemCount-1)
    }
  }
  const incrementCount = ()=>{
      setItemCount(itemCount+1)
  }
  return (
    <Box sx={{marginLeft:"5px", display:"flex", justifyContent:"space-evenly", alignContent:"center", alignItems:"center"}}>
      <Button onClick={decrementCount}> <RemoveIcon/> </Button>
      <p style={{margin:"5px"}}>{itemCount}</p>
      <Button 
          onClick={incrementCount} 
          disabled={itemCount===available_quantity?true:false}
      > 
          <AddIcon/> 
      </Button>
    </Box>
  )
}