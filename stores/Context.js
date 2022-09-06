import { createContext, useState } from 'react'

export const Context = createContext()

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [adminUser, setAdminUser] = useState(null)
  const [products, setProducts] = useState([])
  const [adminProducts, setAdminProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        adminUser,
        setAdminUser,
        products,
        setProducts,
        adminProducts,
        setAdminProducts,
        cartProducts,
        setCartProducts,
      }}
    >
      {children}
    </Context.Provider>
  )
}
