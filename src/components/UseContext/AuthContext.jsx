import React, {createContext, useState } from 'react'

export const AuthContext = createContext()

const UseProvider = ({children}) => {
  const [projetos, setProjetos] = useState([])
  const [status, setStatus] = useState("")
  
  const criarProjeto = (projeto) => {
    setProjetos([...projetos, projeto])
   console.log(projeto)
  }

  return(
  <AuthContext.Provider value={{projetos, criarProjeto, status,setStatus,setProjetos}}>
    {children}
  </AuthContext.Provider>
  )
}


export default UseProvider