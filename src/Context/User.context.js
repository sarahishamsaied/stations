import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
const UserContext = createContext()
export function UserContextProvider({children}) {
    const [user,setUser] = useState({})
    const getUserDetails = async()=>{
        const {data} = await axios.get('https://assessment.api.vweb.app/user')
        setUser(data)
    }
    useEffect(()=>{
        getUserDetails()
    },[])
  return <UserContext.Provider value = {{user,getUserDetails}}>
      {children}
  </UserContext.Provider>
}
export function useUser(){
    return useContext(UserContext)
}
