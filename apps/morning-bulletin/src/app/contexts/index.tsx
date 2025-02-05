import { Provider } from 'react-redux'
import { store } from '../utils/store'
import { ReactNode } from 'react'
import AuthContextProvider from './AuthContext'

type Props = { children: ReactNode }
export default function Providers({ children }: Props) {
    return (
        <Provider store={store}>
            <AuthContextProvider>{children}</AuthContextProvider>
        </Provider>
    )
}
