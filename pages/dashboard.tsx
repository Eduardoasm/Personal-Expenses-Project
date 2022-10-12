import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'



export default function Dashboard(){
    
    const router = useRouter()
    
    const buttonClick = async () => {
        const response = await axios.get("/api/user")
        console.log(response)
    }
    
    const logoutUser = async () => {
        try {
            const response = await axios.post("/api/auth/logout")
            console.log(response)
            router.push("/")
        } catch (error) {
            router.push("/")
            console.log(error)
        }
    }

    return(
        <div>
            <button onClick={() => buttonClick()}>
                boton
            </button>
            <button onClick={() => logoutUser()}>
                logout
            </button>
        </div>
    )
}