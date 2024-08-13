import { create } from 'zustand'
import { Item } from '@/app/interface/interface'

export interface addedItem{
    _id:string;
    name:string;
    quantity:number;
    available_quantity:number;
}

interface State{
    totalAmount:number;
    billAmount:number;
    items:addedItem[];
    billItems:addedItem[];
    addItem:(item:Item)=>void;
    deleteItem:(id:string)=>void;
    addCost:(amount:number)=>void;
    subCost:(amount:number)=>void;
    addBillAmount:(amount:number)=>void;
    addBillItems:(item:addedItem[])=>void;
    clearItems:()=>void;
    clearAmount:()=>void;

}

const addItems = (items:addedItem[], item:Item):addedItem[]=>{
    // console.log("item in store ", item)
    const existingItemIndex = items.findIndex((paticularItem) => paticularItem._id === item._id);
    if (existingItemIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += 1;  
        updatedItems[existingItemIndex].available_quantity -=1;
        return updatedItems;
    } else {
        return [...items, { _id: item._id, name: item.name, quantity: 1, available_quantity:item.available_quantity-1 }];
    }
}

const deleteItem = (items:addedItem[], id:string):addedItem[]=>{
    let updatedItemsList = items.map((paticularItem)=>{
        if(paticularItem._id === id){
            return {
                _id:paticularItem._id,
                name:paticularItem.name,
                quantity:paticularItem.quantity - 1,
                available_quantity:paticularItem.available_quantity+1,
            }
        }
        return paticularItem
    })
    .filter((particularItem) => particularItem.quantity > 0)
    return updatedItemsList
}

const itemStore = create<State>((set)=>({
   totalAmount:0,
   billAmount:0,
   billItems:[] as addedItem[],
   items:[] as addedItem[],
   addItem:(item:Item)=>set((state)=>({
        items : addItems(state.items, item)
   })),
   deleteItem:(id:string)=>set((state)=>({
        items:deleteItem(state.items, id)
   })),
   addCost:(cost:number)=>set((state)=>({
    totalAmount:state.totalAmount+cost
   })),
   subCost:(cost:number)=>set((state)=>({
    totalAmount:state.totalAmount-cost
   })),
   addBillAmount:(cost:number)=>set((state)=>({
    billAmount:cost
   })),
   addBillItems:(items:addedItem[])=>set((state)=>({
    billItems:items
   })),
   clearAmount:()=>set((state)=>({
    totalAmount:0
   })),
   clearItems:()=>set((state)=>({
    items:[] as addedItem[]
   }))

}))

export default itemStore