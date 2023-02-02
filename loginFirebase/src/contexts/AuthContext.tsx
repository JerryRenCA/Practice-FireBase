import { createContext, useContext, ReactElement, useState, useReducer, useEffect } from "react";

type T_AuthState = { //this is type is the output of reducer
  userInfo: string,
  isLogin:boolean
};
const defaultAuthState=():T_AuthState=>{
  const val=localStorage.getItem('user') as string

  if(!val) return{userInfo:'',isLogin:false}

  const a= JSON.parse(val) as T_AuthState
  return a
}
enum T_AuthActionType{
  LOGIN,
  LOGOUT
}
type T_AuthAction={ //this type is for reducer input.
  actionType:T_AuthActionType,
  payload?:string
}
const authReducer=(state:T_AuthState,action:T_AuthAction):T_AuthState=>{
  switch(action.actionType){
    case T_AuthActionType.LOGIN:{
      const newState={...state}
      newState.isLogin=true
      if(action.payload)
        newState.userInfo=action.payload
      return newState
    }
    case T_AuthActionType.LOGOUT:{
      const newState={...state}
      newState.isLogin=false
      newState.userInfo=''
      return newState
    }
    default:
      throw new Error()
  }
}

const useAuthContext=(initState:T_AuthState)=>{
  const [state,dispath]=useReducer(authReducer,initState)
  const userLogin=(userInfo:string)=>dispath({actionType:T_AuthActionType.LOGIN,payload:userInfo})
  const userLogout=()=>dispath({actionType:T_AuthActionType.LOGOUT})
  return { state,userLogin,userLogout}//this is the real type for useContext
}

type T_UseAuthContent=ReturnType<typeof useAuthContext>
const default_UseAuthContent:T_UseAuthContent={ state:defaultAuthState(),userLogin:(a:string)=>{},userLogout:()=>{} }
export const AuthContext = createContext<T_UseAuthContent>(default_UseAuthContent)

export const AuthContextProvider = ({
  children
}: {
  children: ReactElement
}) => {
  const _useAuthContext=useAuthContext(defaultAuthState())
  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(_useAuthContext.state))
  },[_useAuthContext.state])
  return (
    <AuthContext.Provider value={_useAuthContext}>
    {children}
  </AuthContext.Provider>
  )
}
