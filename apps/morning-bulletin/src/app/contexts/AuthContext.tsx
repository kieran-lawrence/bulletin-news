'use client'
import { useContext, createContext, ReactNode, useEffect } from 'react'
import { User } from '../utils/types'
import { useGetAccountMutation } from '../utils/store/auth'
import { validateCookie } from '../utils/helpers'
import { Loader } from '../components/Loader'
import styled from 'styled-components'

const AuthContext = createContext<User | undefined>(undefined)

type Props = { children: ReactNode }
export default function AuthContextProvider({ children }: Props) {
    const [getUserInfo, { isLoading, data }] = useGetAccountMutation()
    useEffect(() => {
        const token = validateCookie('TOKEN')
        // Only attempt to refresh auth if we have a valid token
        if (token) {
            getUserInfo(token)
        }
    }, [getUserInfo])

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
