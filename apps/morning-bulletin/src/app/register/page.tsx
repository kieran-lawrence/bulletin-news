'use client'

import styled from 'styled-components'
import { HeaderLogo } from '../components/HeaderLogo'
import Link from 'next/link'
import { BulletinButton } from '../styles/shared'
import { PiSealWarningBold } from 'react-icons/pi'
import { useAuth } from '../contexts/AuthContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { usePostRegisterMutation } from '../utils/store/auth'

interface RegisterFormProps {
    firstName: string
    lastName: string
    email: string
    dateOfBirth: string
    password: string
}

export default function Register() {
    const user = useAuth()
    const [handleRegister, { isLoading, error }] = usePostRegisterMutation()
    const { register, handleSubmit } = useForm<RegisterFormProps>()
    const router = useRouter()

    const onSubmit: SubmitHandler<RegisterFormProps> = (data) => {
        handleRegister(data).then(() => {
            router.push('/register/success')
        })
    }

    // Redirect to previous page if already signed in
    if (user) router.back()

    return (
        <RegisterPage>
            <HeaderLogo level="h2" />
            <div className="registrationWrapper">
                <h1>Create your free account</h1>
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
                <RegisterForm onSubmit={handleSubmit(onSubmit)}>
                    <NameInputsWrapper>
                        <Input
                            id="firstNameInput"
                            type="text"
                            placeholder="First Name"
                            required
                            {...register('firstName')}
                            $width="50%"
                        />
                        <Input
                            id="lastNameInput"
                            type="text"
                            placeholder="Last Name"
                            required
                            {...register('lastName')}
                            $width="50%"
                        />
                    </NameInputsWrapper>
                    <Input
                        id="dobInput"
                        type="date"
                        min="1900-01-01"
                        max={new Date().toISOString().split('T')[0]}
                        required
                        {...register('dateOfBirth')}
                    />
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
                    <BulletinButton
                        type="submit"
                        disabled={isLoading}
                        $fontSize="18px"
                        $fontWeight={700}
                        $padding="16px 32px"
                    >
                        {isLoading ? 'Loading...' : 'Register'}
                    </BulletinButton>
                </RegisterForm>
                <small>
                    By continuing you agree to our{' '}
                    <Link href="/terms-of-service">Terms of Service</Link> and{' '}
                    <Link href="/privacy-policy">Privacy Policy</Link>
                </small>
                <Divider />

                <RegisterCta>
                    Already have an account?
                    <Link href="/login">Login</Link>
                </RegisterCta>
            </div>
        </RegisterPage>
    )
}
const RegisterPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 18px;

    .registrationWrapper {
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
const RegisterForm = styled.form`
    width: 25vw;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    box-sizing: border-box;
`
const Input = styled.input<{ $width?: string }>`
    font-size: 16px;
    border: 1px solid white;
    border-radius: 4px;
    background: #f5f5f5;
    padding: 16px 32px;
    border: 1px solid #ccc;
    outline: none;
    box-sizing: border-box;
    width: ${(props) => props.$width || '100%'};

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
const NameInputsWrapper = styled.div`
    display: flex;
    gap: 16px;
`
