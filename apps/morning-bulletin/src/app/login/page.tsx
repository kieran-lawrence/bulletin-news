'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { HeaderLogo } from '../components/HeaderLogo'
import { usePostLoginMutation } from '../utils/store/auth'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PiSealWarningBold } from 'react-icons/pi'
import { addCookie } from '../utils/helpers'
import { useRouter } from 'next/navigation'
import { BulletinButton } from '../styles/shared'
import { useAuth } from '../contexts/AuthContext'

interface LoginFormProps {
    email: string
    password: string
}

export default function Login() {
    const { user } = useAuth()
    const [handleLogin, { isLoading, error }] = usePostLoginMutation()
    const { register, handleSubmit } = useForm<LoginFormProps>()
    const router = useRouter()

    /** Sends login request, sets token cookie, and redirects to previous page on success */
    const onSubmit: SubmitHandler<LoginFormProps> = (data) => {
        handleLogin(data)
            .unwrap()
            .then((payload) => {
                if (payload && payload.access_token) {
                    // Verify token was saved before navigating back
                    if (addCookie('TOKEN', payload.access_token)) {
                        router.back()
                    }
                }
            })
    }

    // Redirect to previous page if already signed in
    if (user) router.back()

    return (
        <LoginPage>
            <HeaderLogo level="h2" />
            <div className="loginWrapper">
                <h1>Login</h1>
                <h2>
                    Stay up to date on local, national and international news.
                </h2>
                {error && (
                    <Error>
                        <PiSealWarningBold color={'#d34e22'} size={24} />
                        {'data' in error
                            ? error.data?.message
                            : 'An unknown error has occurred'}
                    </Error>
                )}
                <LoginForm onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        id="emailInput"
                        type="email"
                        placeholder="Email"
                        required
                        {...register('email')}
                    />
                    <Input
                        id="passwordInput"
                        type="password"
                        placeholder="Password"
                        required
                        {...register('password')}
                    />
                    <Link href="/forgot-password">Forgot your password?</Link>
                    <BulletinButton
                        type="submit"
                        disabled={isLoading}
                        $fontSize="18px"
                        $fontWeight={700}
                        $padding="16px 32px"
                    >
                        {isLoading ? 'Loading...' : 'Log In'}
                    </BulletinButton>
                </LoginForm>
                <Divider />
                <RegisterCta>
                    Don&apos;t have an account?
                    <Link href="/register">Register now</Link>
                </RegisterCta>
            </div>
        </LoginPage>
    )
}
const LoginPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 18px;

    .loginWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        height: 90%;

        h1 {
        }
        h2 {
            font-size: 18px;
            font-weight: 400;
        }
        a {
            font-size: 15px;
        }
    }
`
const LoginForm = styled.form`
    width: 20vw;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    box-sizing: border-box;
`
const Input = styled.input`
    font-size: 16px;
    border: 1px solid white;
    border-radius: 4px;
    background: #f5f5f5;
    padding: 16px 32px;
    border: 1px solid #ccc;
    outline: none;
    box-sizing: border-box;

    &:focus,
    &:active {
        border: 1px solid #e9353b;
    }
`

const Divider = styled.hr`
    height: 1px;
    width: 12vw;
    background: #adadad;
    border: none;
    margin: 16px 0;
`
const RegisterCta = styled.div`
    display: flex;
    gap: 8px;
    font-size: 15px;
`
const Error = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    color: #d34e22;
    font-size: 18px;
    font-weight: 400;
`
