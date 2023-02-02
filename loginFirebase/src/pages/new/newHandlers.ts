import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { Dispatch, useState } from "react";
import { auth, db } from "../../firebase";

// types
export type T_User = {
  username: string;
  email: string;
  password: string;
};
export const default_User: T_User = { username: "", email: "", password: "" };

export const handleInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  userData: T_User,
  setUserData: React.Dispatch<React.SetStateAction<T_User>>
) => {
  type key = keyof T_User;
  const id = e.target.id as key;
  const val = e.target.value;
  const newData = { ...userData };
  newData[id] = val;
  setUserData(newData);
};
function checkValidate(userData: T_User) {
  if (userData.email == "") return false;
  return true;
}
export const handleAdd = async (
  e: React.FormEvent<HTMLFormElement>,
  userData: T_User,
  setUserData: React.Dispatch<React.SetStateAction<T_User>>
) => {
  e.preventDefault();
  if (!checkValidate(userData)) return;
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    await setDoc(doc(db, "userInfo", res.user.uid), {
      ...userData,
      timeStamp: serverTimestamp(),
    });
    console.log(res.user);
    setUserData(default_User);
  } catch (e) {
    console.log('')
  }
};

export const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  // e.target.files[0];
};
