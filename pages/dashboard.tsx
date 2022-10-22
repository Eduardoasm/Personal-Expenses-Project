import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent, ChangeEventHandler } from "react";
import styles from "../styles/dashboard.module.css";
import { BsPiggyBank, BsBank2 } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { BiLogOut } from 'react-icons/bi'
import { useEffect } from "react"
import { UserModel } from "../models/models";


export default function Dashboard() {
  interface numberUser {
    add: number;
  }

  interface userModel{
    username: string,
    email: string,
    balance: number
  }


  // const [add, setAdd] = useState<number>(0)
  const [user, setUser] = useState<userModel>({
    username: "",
    email: "" ,
    balance: 0
  })

  const [add, setAdd] = useState<numberUser>({
    add: 0,
  });
  const router = useRouter();

  // const buttonClick = async () => {
  //     const response = await axios.get("/api/user")
  //     console.log(response)
  // }

  const logoutUser = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      console.log(response);
      router.push("/");
    } catch (error) {
      router.push("/");
      console.log(error);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    // setAdd(parseInt(e.currentTarget.value))
    setAdd({
      ...add,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    // console.log(add)
  };

  const addMoney = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("soy add", add);
      const response = await axios.post("/api/walletUser/sumBalance", add);
      console.log(response);
    } catch (error) {
      console.log("toy mandando error", error);
    }
  };



 useEffect(()=> {
    const userInfo = async () => {
      const result = await axios.get("/api/user/infoUser")
      setUser(result.data)
      // console.log(result.data)
    }
    userInfo()
    console.log(user)
    // console.log(user)
  },[])


  
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <ul className={styles.ul}>
          <li className={styles.active}>
            <p className={styles.icon}>
              <BsPiggyBank />
            </p>
            <p>
              Deposit
            </p>
          </li>
          <li>
            <p className={styles.icon}>
              <GiPayMoney />
            </p>
            <p>
              Withdraw
            </p>
          </li>
          <li onClick={() => logoutUser()}>
            <p className={styles.icon}> 
        <BiLogOut>
        </BiLogOut>
            </p>
        <p>
        Logout
        </p>
          </li>
        </ul>
      </div>
      <div>
        <div className={styles.balance}>
          <h2>
            {user.balance}
          </h2>
          {/* <h2>
            {user && user.map(userBalance => (
              <div key={userBalance.id}>
                <h1>{userBalance.balance}</h1>
              </div>
            ))}
          </h2> */}
        <form onSubmit={(e) => addMoney(e)}>
          <input
            type="number"
            name="add"
            value={add.add}
            onChange={handleChange}
          />
          <button>agregar</button>
        </form>
        </div>
      </div>
    </div>
  );
}
