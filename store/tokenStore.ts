import { create } from 'zustand'

interface AddToken{
    token:string | null;
    addToken:(token:(string | null))=>void;
    deleteToken:()=>void;
}

const tokenStore = create<AddToken>((set)=>({
    token:"",
    addToken:(token:string | null)=>set((state)=>({
        token:token
    })),
    deleteToken:()=>set((state)=>({
        token:""
    }))
}))

export default tokenStore