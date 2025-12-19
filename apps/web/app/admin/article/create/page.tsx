'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { type ArticleSection } from '@repo/api'
import { useState } from 'react'
import styled from 'styled-components'
import { PiSealWarningBold, PiInfo } from 'react-icons/pi'
import { HeaderLogo } from '../../../../components/HeaderLogo'
import { BulletinButton } from '../../../../utils/styles/shared'
import { CreateArticleProps } from '../../../../utils/types'
import { usePostArticleMutation } from '../../../../utils/store/article'
import { useRouter } from 'next/navigation'

interface Message {
    visible: boolean
    message: string
    type: 'success' | 'error'
}

type ArticleFormData = Omit<CreateArticleProps, 'articleSections'> & {
    articleSections: string // JSON string input
}

export default function CreateArticle() {
    const [handleArticleCreation, { isLoading }] = usePostArticleMutation()
    const { register, handleSubmit } = useForm<ArticleFormData>()
    const [message, setMessage] = useState<Message>()
    const router = useRouter()

    // Helper to parse article sections from JSON string
    function parseSections(input: string): ArticleSection[] {
        try {
            const parsed = JSON.parse(input)
            if (Array.isArray(parsed)) return parsed
            return []
        } catch {
            return []
        }
    }

    const onSubmit: SubmitHandler<ArticleFormData> = (data) => {
        // Flags as dropdown (single value or blank)
        const flags = Array.isArray(data.flags)
            ? data.flags.filter((f) => f && f !== '')
            : data.flags
              ? [data.flags]
              : []
        const formData: CreateArticleProps = {
            ...data,
            flags,
            readTime: Number(data.readTime),
            publisherId: Number(data.publisherId),
            articleSections: parseSections(data.articleSections),
        }

        handleArticleCreation(formData)
            .then((res) => {
                if (!('error' in res)) {
                    setMessage({
                        visible: true,
                        message: 'Article created successfully!',
                        type: 'success',
                    })
                    router.push('/')
                } else {
                    setMessage({
                        visible: true,
                        message: 'Error creating article',
                        type: 'error',
                    })
                }
            })
            .catch(() => {
                setMessage({
                    visible: true,
                    message: 'Error creating article',
                    type: 'error',
                })
            })
    }

    return (
        <CreateArticlePage>
            <HeaderLogo level="h2" />
            <div className="createArticleWrapper">
                <h1>Create an Article</h1>
                <h2>Complete the form below to create a new article.</h2>
                {message && message.visible && getFormattedMessage(message)}
                <CreateArticleForm onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        id="authorInput"
                        type="text"
                        placeholder="Author Name"
                        {...register('author', { required: true })}
                    />
                    <Input
                        id="titleInput"
                        type="text"
                        placeholder="Title"
                        {...register('title', { required: true })}
                    />
                    <Input
                        id="categoryInput"
                        type="text"
                        placeholder="Category"
                        {...register('category', { required: true })}
                    />
                    <Input
                        id="readTimeInput"
                        type="number"
                        placeholder="Read Time (minutes)"
                        {...register('readTime', { required: true })}
                    />
                    <Input
                        id="urlToImageInput"
                        type="text"
                        placeholder="Main image URL"
                        {...register('urlToImage', { required: true })}
                    />
                    <Input
                        id="publishedAtInput"
                        type="date"
                        placeholder="Published At"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        {...register('publishedAt', { required: true })}
                    />
                    <Input
                        id="publisherIdInput"
                        type="number"
                        placeholder="Publisher ID"
                        {...register('publisherId', {
                            required: true,
                            valueAsNumber: true,
                        })}
                    />
                    <FlagLabel>
                        Flags
                        <FlagSelect multiple {...register('flags')} size={4}>
                            <option value="must-read">Must Read</option>
                            <option value="trending">Trending</option>
                            <option value="editors-pick">Editors Pick</option>
                        </FlagSelect>
                    </FlagLabel>
                    <textarea
                        id="articleSectionsInput"
                        required
                        placeholder='Article Sections (JSON array, e.g. [{"kind":"text","text":"Hello world"}])'
                        style={{
                            fontSize: 16,
                            padding: '16px 32px',
                            borderRadius: 4,
                            border: '1px solid #ccc',
                            minHeight: 80,
                        }}
                        {...register('articleSections')}
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
                </CreateArticleForm>
            </div>
        </CreateArticlePage>
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
const CreateArticlePage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 18px;

    .createArticleWrapper {
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
const CreateArticleForm = styled.form`
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

const FlagLabel = styled.label`
    font-weight: 600;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
`

const FlagSelect = styled.select`
    font-size: 16px;
    padding: 16px 32px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-top: 4px;
    background: #f5f5f5;
    box-sizing: border-box;
    outline: none;
    &:focus,
    &:active {
        border: 1px solid #e9353b;
    }
`
