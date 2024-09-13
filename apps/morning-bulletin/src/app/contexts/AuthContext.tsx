'use client'
import { useContext, createContext, ReactNode, useEffect } from 'react'
import { User } from '../utils/types'
import { useGetAuthStatusMutation } from '../utils/store/auth'
import { validateCookie } from '../utils/helpers'
import { Loader } from '../components/Loader'
import styled from 'styled-components'

const AuthContext = createContext<User | undefined>(undefined)

type Props = { children: ReactNode }
export default function AuthContextProvider({ children }: Props) {
    const [checkAuth, { isLoading, data }] = useGetAuthStatusMutation()

    useEffect(() => {
        const token = validateCookie('TOKEN')
        // Only attempt to refresh auth if we have a valid token
        if (token) {
            checkAuth(token)
        }
    }, [checkAuth])

    return isLoading ? (
        <LoadingWrapper>
            <Loader />
        </LoadingWrapper>
    ) : (
        <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
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
