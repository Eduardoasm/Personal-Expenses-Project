import React from "react";
import axios from "axios";
import type { FormEvent, ChangeEventHandler } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/register.module.css";

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
    const response = await axios.post("/api/auth/createUser", inputChange);
    console.log(response);
    if (response.status === 200) {
      return router.push("/");
    }
  };

  return (
    <div className={styles.main}>
        <div className={styles.register}>
          <form 
          className={styles.form}
          onSubmit={(e) => register(e)}>
            <label>username</label>
            <input
            className={styles.input}
              name="username"
              type="username"
              value={inputChange.username}
              onChange={handleChange}
            />
            <label>email</label>
            <input
            className={styles.input}
              name="email"
              type="email"
              value={inputChange.email}
              onChange={handleChange}
            />
            <label>password</label>
            <input
            className={styles.input}
              name="password"
              type="password"
              value={inputChange.password}
              onChange={handleChange}
            />
            <label>repeat password</label>
            <input
              className={styles.input}
              name="repeatPassword"
              type="password"
              value={inputChange.repeatPassword}
              onChange={handleChange}
            />
            <button>register</button>
          </form>
        </div>
    </div>
  );
}
