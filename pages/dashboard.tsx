import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormEvent, ChangeEventHandler } from 'react'
import styles from "../styles/dashboard.module.css"
import { BsPiggyBank, BsBank2 } from 'react-icons/bs'
import {  GiPayMoney } from 'react-icons/gi'


export default function Dashboard(){

    interface numberUser{
        add: number
    }
    
    // const [add, setAdd] = useState<number>(0)
    const [add, setAdd] = useState<numberUser>({
        add: 0
    })
    const router = useRouter()
    
    // const buttonClick = async () => {
    //     const response = await axios.get("/api/user")
    //     console.log(response)
    // }
    
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

    const handleChange: ChangeEventHandler<HTMLInputElement>  = (e) => {
    e.preventDefault();
    // setAdd(parseInt(e.currentTarget.value))
    setAdd({
        ...add,
        [e.currentTarget.name]: e.currentTarget.value
    })
    // console.log(add)
    }

    const addMoney = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("soy add", add)
            const response = await axios.post("/api/walletUser/sumBalance", add)
            console.log(response)
        } catch (error) {
            console.log("toy mandando error", error)
        }
    }

    return(
        <div className={styles.main}>
            <div className={styles.sidebar}>
            <ul className={styles.ul}>
                <li>

            <BsPiggyBank/>
            <p>
            Deposit  
            </p>
    
                </li>
                <li>
            <GiPayMoney/>
                Withdraw
                </li>
            </ul>
            </div>
            <div>
            <form onSubmit={(e) => addMoney(e)}>
            <input
            type="number"
            name='add'
            value={add.add}
            onChange={handleChange}
            />
            <button>
                agregar
            </button>
            </form>
            <button onClick={() => logoutUser()}>
                logout
            </button>
            </div>
        </div>
    )
}