import React from "react";
import axios from "axios";
import type { FormEvent, ChangeEventHandler } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/register.module.css";
import Swal from 'sweetalert2';



export default function Register() {
  const router = useRouter();
  
  interface CreateUser {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
  }

  const [inputChange, setInputChange] = useState<CreateUser>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setInputChange({
      ...inputChange,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    console.log(inputChange);

  };

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/createUser", inputChange);
      console.log("soy response", response);
      if (response.status === 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your Account have been created',
          showConfirmButton: false,
          timer: 1500
        })
        return router.push("/");
      }

    } catch (error) {
      console.log(error)
    }
  };

  const buttonHome = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return router.push("/")
  }

  return (
    <div className={styles.main}>
        <div className={styles.register}>
            <div className={styles.containerRegister}>
          <form 
          className={styles.form}
          onSubmit={(e) => register(e)}>
            <label className={styles.labelsStyles}>
            Username
            </label>
            <input
            // required= {true}
            placeholder="Username"
            className={styles.input}
              name="username"
              type="username"
              value={inputChange.username}
              onChange={handleChange}
            />
            <label className={styles.labelsStyles}>
            Email
            </label>
            <input
            required= {true}
            placeholder="Email"
            className={styles.input}
              name="email"
              type="email"
              value={inputChange.email}
              onChange={handleChange}
            />
            <label className={styles.labelsStyles}>
            Password
            </label>
            <input
            required= {true}
            placeholder="Password"
            className={styles.input}
              name="password"
              type="password"
              value={inputChange.password}
              onChange={handleChange}
            />
            <label className={styles.labelsStyles}>
            Repeat Password
            </label>
            <input
            required= {true}
            placeholder="Password"
              className={styles.input}
              name="repeatPassword"
              type="password"
              value={inputChange.repeatPassword}
              onChange={handleChange}
            />
            <button className={styles.button1}>
            register
            </button>
          </form>
          <label className={styles.labelsStyles1}>
            Have account? log in Here
          </label>
          <button className={styles.button1}
          onClick={(e) => buttonHome(e)}>
            Log In
          </button>
            </div>
        </div>
    </div>
  );
}
