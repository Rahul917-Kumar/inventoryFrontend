'use client'

import React, { useEffect, useState } from 'react'
import { Item } from '../interface/interface'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import itemStore from '../../../store/itemsStore';

interface ItemCardProps {
  item: Item;
}

interface AddItem{
  itemCount:number;
  available_quantity:number;
  handleAddItems:()=>void;
  handleRemoveItems:()=>void;
}

const ItemCard = ({item}:ItemCardProps) => {
  const [itemCount, setItemCount] = useState(0)

  const {addItem, deleteItem, addCost, subCost} = itemStore((state)=>({
    addItem:state.addItem,
    deleteItem:state.deleteItem,
    addCost:state.addCost,
    subCost:state.subCost
  }))

  const handleAddItems = ()=>{
    setItemCount(itemCount + 1)
    addItem(item)
    addCost(item.price)
  }

  const handleRemoveItems = ()=>{
    if(itemCount !==0){
      setItemCount(itemCount-1)
      deleteItem(item._id)
      subCost(item.price)
    }
  }
  
  return (
    <div>
        <div className='card flexElements'>
          <div className='flexElementsRow'>
            <div className='imageCardContainer'>
              {/* image */}
              <img 
                  src="https://th.bing.com/th/id/OIP.eTT3w24Pb9S-JKIIw85AewHaKE?w=132&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" 
                  alt="Item Image"
                  style={{width:"100%", height:"100%", objectFit:"contain", boxShadow:"0 4px 2px -2px rgba(0, 0, 0, 0.2)"}}    
                  
              />
            </div>
          </div>
          <div style={{backgroundColor:"", padding:"0.5rem", textAlign:"center"}}>
            <Typography variant='h5' sx={{fontWeight:"bold", fontFamily:"Roboto sans-serif"}}> {item.name} </Typography>
            <Typography sx={{fontWeight:"500", margin:"0.5rem 0 0.5rem 0"}}>₹ {item.price}</Typography>
          </div>
          
            {
              itemCount===0?(
                <>
                    <div 
                        className='addItemDiv'
                        onClick={()=>handleAddItems()}
                      >
                      ADD
                    </div>
                </>
              ):(
                <>
                  <div className='addItemDiv'>
                    <IncrementDecrementCount 
                                itemCount={itemCount} 
                                available_quantity={item.available_quantity} 
                                handleAddItems={handleAddItems}
                                handleRemoveItems={handleRemoveItems}
                    />
                  </div>
                </>
              )
            }
        </div>
    </div>
  )
}

export default ItemCard


const IncrementDecrementCount = ({itemCount, available_quantity, handleAddItems, handleRemoveItems}:AddItem)=>{
  return (
    <Box sx={{   display:"flex", justifyContent:"space-evenly", alignContent:"center", alignItems:"center",}}>
      <Button onClick={handleRemoveItems} sx={{color:"white", padding:"0", margin:"0"}}> <RemoveIcon/> </Button>
      <p style={{fontWeight:"bold", padding:"0", margin:"0"}}>{itemCount}</p>
      <Button 
          onClick={handleAddItems} 
          disabled={itemCount===available_quantity?true:false}
          sx={{color:"white", padding:"0", margin:"0"}}
      > 
          <AddIcon/> 
      </Button>
    </Box>
  )
}