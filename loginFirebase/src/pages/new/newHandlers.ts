import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";

// types
export type T_User = {
    userName: string,
    password: string
  };
export  const default_User: T_User = { userName: "",password:"" };

export const [userData, setUserData] = useState(default_User);

export const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    type key =keyof T_User
    const id=e.target.id as key
    const val=e.target.value
    const newData={...userData}
    newData[id]=val
};
export const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("res");
  const res = await addDoc(collection(db, "cities"), {
    name: "Los Angeles 11",
    state: "CA2",
    country: "USA2",
  });
  console.log(res);
};

export   const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.files[0];
  };