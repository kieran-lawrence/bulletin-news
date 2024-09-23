'use client'
import {
    useContext,
    createContext,
    ReactNode,
    useEffect,
    useState,
} from 'react'
import { User } from '../utils/types'
import { useGetAccountMutation } from '../utils/store/auth'
import { validateCookie } from '../utils/helpers'
import { Loader } from '../components/Loader'
import styled from 'styled-components'

type InitialState = {
    authLoading: true
    user: undefined
}
type LoadedState = {
    authLoading: false
    user: User
}

export type AuthContextType = LoadedState | InitialState

const AuthContext = createContext<AuthContextType>({
    user: undefined,
    authLoading: true,
})

type Props = { children: ReactNode }
export default function AuthContextProvider({ children }: Props) {
    const [getUserInfo] = useGetAccountMutation()
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const token = validateCookie('TOKEN')
        // Only attempt to refresh auth if we have a valid token
        if (token) {
            getUserInfo(token)
                .unwrap()
                .then((userInfo) => {
                    setUser(userInfo)
                    setLoading(false)
                })
        }
    }, [getUserInfo])

    return !user || loading ? (
        <LoadingWrapper>
            <Loader />
        </LoadingWrapper>
    ) : (
        <AuthContext.Provider value={{ user, authLoading: loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
const LoadingWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
`
