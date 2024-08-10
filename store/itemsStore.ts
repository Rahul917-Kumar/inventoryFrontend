import { create } from 'zustand'
import { Item } from '@/app/interface/interface'

interface addedItem{
    _id:string;
    name:string;
    quantity:number;
}

interface State{
    totalAmount:number;
    items:addedItem[];
    addItem:(item:Item)=>void;
    deleteItem:(id:string)=>void;
}

interface Action{
    addItem:(item:Item)=>void;
    deleteItem:(id:string)=>void;
    addCost:(amount:number)=>void;
    subCost:(amount:number)=>void;
}

const addItems = (items:addedItem[], item:Item):addedItem[]=>{
    const existingItemIndex = items.findIndex((paticularItem) => paticularItem._id === item._id);
    if (existingItemIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
    } else {
        return [...items, { _id: item._id, name: item.name, quantity: 1 }];
    }
}

const deleteItem = (items:addedItem[], id:string):addedItem[]=>{
    let updatedItemsList = items.map((paticularItem)=>{
        if(paticularItem._id === id){
            return {
                _id:paticularItem._id,
                name:paticularItem._id,
                quantity:paticularItem.quantity - 1
            }
        }
        return paticularItem
    })
    .filter((particularItem) => particularItem.quantity > 0)
    return updatedItemsList
}

const itemStore = create<State>((set)=>({
   totalAmount:0,
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
   }))

}))

export default itemStore