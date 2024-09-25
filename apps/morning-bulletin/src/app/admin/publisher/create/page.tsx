'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Publisher } from '../../../utils/types'
import { usePostPublisherMutation } from '../../../utils/store/publisher'
import { useState } from 'react'
import styled from 'styled-components'
import { PiSealWarningBold, PiInfo } from 'react-icons/pi'
import { HeaderLogo } from '../../../components/HeaderLogo'
import { BulletinButton } from '../../../styles/shared'
import { useRouter } from 'next/navigation'

interface Message {
    visible: boolean
    message: string
    type: 'success' | 'error'
}
type CreatePublisherProps = Omit<Publisher, 'id'>

export default function CreatePublisher() {
    const [handlePublisherCreation, { isLoading }] = usePostPublisherMutation()
    const { register, handleSubmit, reset } = useForm<CreatePublisherProps>()
    const [message, setMessage] = useState<Message>()
    const router = useRouter()

    const onSubmit: SubmitHandler<CreatePublisherProps> = (data) => {
        handlePublisherCreation(data)
            .then(() => {
                setMessage({
                    visible: true,
                    message: 'Publisher created successfully',
                    type: 'success',
                })
                router.push('/')
            })
            .catch((error) => {
                setMessage({
                    visible: true,
                    message: error.data?.message || 'Error creating publisher',
                    type: 'error',
                })
            })
    }
    return (
        <CreatePublisherPage>
            <HeaderLogo level="h2" />
            <div className="createPublisherWrapper">
                <h1>Create a Publisher</h1>
                <h2>Complete the form below to create a new publisher.</h2>
                {message && message.visible && getFormattedMessage(message)}
                <CreatePublisherForm onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="text"
                        required
                        placeholder="Name"
                        {...register('name')}
                    />
                    <Input
                        type="text"
                        required
                        placeholder="Instagram Handle"
                        {...register('handle')}
                    />
                    <Input
                        type="text"
                        required
                        placeholder="Description"
                        {...register('description')}
                    />
                    <Input
                        type="text"
                        required
                        placeholder="Logo Url"
                        {...register('logoUrl')}
                    />
                    <Input
                        type="text"
                        required
                        placeholder="Category"
                        {...register('category')}
                    />
                    <BulletinButton
                        type="submit"
                        disabled={isLoading}
                        $fontSize="18px"
                        $fontWeight={700}
                        $padding="16px 32px"
                    >
                        {isLoading ? 'Loading...' : 'Create'}
                    </BulletinButton>
                </CreatePublisherForm>
            </div>
        </CreatePublisherPage>
    )
}

const getFormattedMessage = ({ type, message }: Message) => {
    return type === 'success' ? (
        <SuccessMessage>
            <PiInfo color={'#229e22'} size={24} />
            {message}
        </SuccessMessage>
    ) : (
        <ErrorMessage>
            <PiSealWarningBold color={'#d34e22'} size={24} />
            {message}
        </ErrorMessage>
    )
}
const CreatePublisherPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 18px;

    .createPublisherWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        height: 90%;

        h2 {
            font-size: 18px;
            font-weight: 400;
        }
    }
`
const CreatePublisherForm = styled.form`
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
const SuccessMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    color: #229e22;
    padding-top: 16px;
`
const ErrorMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    color: #d34e22;
    padding-top: 16px;
`
