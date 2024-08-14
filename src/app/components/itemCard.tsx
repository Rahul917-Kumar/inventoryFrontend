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
import Image from './image';
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
        <div className='card' style={{height: "22rem"}}>
          <Image image_url={item.display_image_url} />
          
          <div style={{ display:"flex", margin:"0.6rem 0 0.6rem 0 ",alignItems:"flex-end", height:"4.5rem"}}>
            <Typography variant='h5' sx={{fontWeight:"400", letterSpacing:"1px", margin:"0.4rem"}}> {item.name} </Typography>
          </div>
            <div className='quantityAndItemLeft' style={{margin:"0.4rem"}}>
              <Typography sx={{fontWeight:"450", fontSize:"1.4rem"}}>₹ {item.price}</Typography>
              <Typography sx={{fontSize:"0.8rem", color:"blue"}}>only <span style={{fontWeight:"bold"}}>{item.available_quantity}</span> left</Typography>
            </div>

            {
              itemCount===0?(
                <>
                    <div 
                        className='addItemDiv'
                        onClick={()=>handleAddItems()}
                        style={{padding:"0.9rem"}}
                      >
                      ADD
                    </div>
                </>
              ):(
                <>
                  <div className='addItemDiv' style={{padding:"0.9rem"}}>
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
      <RemoveIcon onClick={handleRemoveItems} sx={{color:"white", padding:"0", margin:"0"}}/> 
      <p style={{fontWeight:"bold", padding:"0", margin:"0", fontSize:"1rem"}}>{itemCount}</p>
          <AddIcon 
              onClick={()=>{
                if(itemCount!==available_quantity)
                  handleAddItems()
              }} 
              sx={{color: itemCount===available_quantity?"gray":"white", padding:"0", margin:"0"}}/> 
    </Box>
  )
}