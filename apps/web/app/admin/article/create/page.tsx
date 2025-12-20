'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import styled from 'styled-components'
import { PiSealWarningBold, PiInfo } from 'react-icons/pi'
import { HeaderLogo } from '../../../../components/HeaderLogo'
import { CreateArticleProps } from '../../../../utils/types'
import { usePostArticleMutation } from '../../../../utils/store/article'
import { useRouter } from 'next/navigation'
import { RichTextInput } from '../../../../components/comments/RichText'
import { Descendant } from 'slate'

interface Message {
    visible: boolean
    message: string
    type: 'success' | 'error'
}

type ArticleFormData = Omit<CreateArticleProps, 'articleSections'>

export default function CreateArticle() {
    const [handleArticleCreation, { isLoading }] = usePostArticleMutation()
    const { register, handleSubmit } = useForm<ArticleFormData>()
    const [message, setMessage] = useState<Message>()
    const router = useRouter()
    const [articleBlocks, setArticleBlocks] = useState<Descendant[]>([
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ])

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
            articleSections: articleBlocks,
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
                    <HorizontalInputsWrapper>
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
                    </HorizontalInputsWrapper>
                    <HorizontalInputsWrapper>
                        <Input
                            id="categoryInput"
                            type="text"
                            placeholder="Category"
                            {...register('category', { required: true })}
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
                    </HorizontalInputsWrapper>
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
                    <FlagLabel>
                        Flags
                        <FlagSelect multiple {...register('flags')} size={3}>
                            <option value="must-read">Must Read</option>
                            <option value="trending">Trending</option>
                            <option value="editors-pick">Editors Pick</option>
                        </FlagSelect>
                    </FlagLabel>
                    <ArticleContentContainer>
                        <RichTextInput
                            onSubmit={setArticleBlocks}
                            initialValue={articleBlocks}
                            showToolbar={true}
                            readOnly={isLoading}
                            buttonText={isLoading ? 'Loading...' : 'Create'}
                            placeholder={'Add some content to this article!'}
                            mode="comment"
                        />
                    </ArticleContentContainer>
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
    overflow: scroll;
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

export const ArticleContentContainer = styled.div`
    .editorContainer {
        flex-direction: column;
    }
    .richTextEditor {
        flex: 1;
        padding: 6px 12px;
        background: white;
        border: 1px solid #6565659f;
        border-radius: 4px;
    }
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
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: #f5f5f5;
    box-sizing: border-box;
    outline: none;
    &:focus,
    &:active {
        border: 1px solid #e9353b;
    }
`

const HorizontalInputsWrapper = styled.div`
    display: flex;
    gap: 16px;
`
