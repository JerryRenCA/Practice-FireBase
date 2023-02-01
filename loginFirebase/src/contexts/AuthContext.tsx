import { createContext, useContext, ReactElement, useState, useReducer } from "react";

export type T_AuthState = {
  currentUser: boolean,
};
enum T_AuthActionType{
  SETCURRENTUSER
}
type T_AuthAction={
  actionType:T_AuthActionType,
  payload?:boolean
}
const authReducer=(state:T_AuthState,action:T_AuthAction)=>{
  switch(action.actionType){
    case T_AuthActionType.SETCURRENTUSER:{
      const newState={...state}
      if(action.payload)
        newState.currentUser=action.payload
      return newState
    }
    default:
      throw new Error()
  }
}

const useAuthContext=(initState:T_AuthState)=>{
  const [state,dispath]=useReducer(authReducer,initState)
  const setUser=(hasUser:boolean)=>dispath({actionType:T_AuthActionType.SETCURRENTUSER,payload:hasUser})
  return { currentUser:state.currentUser,setUser}
}

type T_UseAuthContent=ReturnType<typeof useAuthContext>
const default_UseAuthContent:T_UseAuthContent={ currentUser:false,setUser:(a:boolean)=>{} }
export const AuthContext = createContext<T_UseAuthContent>(default_UseAuthContent)

export const AuthContextProvider = ({
  children
}: {
  children: ReactElement
}) => {
  
  return (
    <AuthContext.Provider value={useAuthContext({currentUser:false})}>
    {children}
  </AuthContext.Provider>
  )
}
