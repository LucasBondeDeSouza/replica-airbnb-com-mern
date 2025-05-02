import axios from "axios"
import { createContext, useContext, useState, useEffect } from "react"

export const UserContext = createContext(null)

export const useUserContext = () => useContext(UserContext)

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const axiosGet = async () => {
            const { data } = await axios.get('/users/profile')
            
            setUser(data)
            setReady(true)
        }

        axiosGet()
    }, [])
    
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}