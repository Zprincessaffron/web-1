import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const userContext = createContext({});

export const UserContextProvider = ({children})=>{

  const [user, setUser] = useState(null);

  useEffect(()=>{
    if(!user){
      axios.get('/profile').then(({data})=>{
        setUser(data);
      })
    }
  },[])

  return(
    <userContext.Provider value={{user,setUser}}>
      {children}
    </userContext.Provider>
  )
}
