import { createContext, useContext, useState, useEffect } from 'react'
import { getCurUser } from '@/lib/appwrite'

const defaultGlobalContext = {
    isLoggedIn: false,
    setIsLoggedIn: (value: boolean) => {},
    user: null,
    setUser: (user: any) => {},
    isLoading: true
}
const GlobalContext = createContext(defaultGlobalContext)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }: any) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ user, setUser ] = useState<any>(null)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        getCurUser()
            .then((res) => {
                if(res) {
                    setIsLoggedIn(true)
                    setUser(res)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider