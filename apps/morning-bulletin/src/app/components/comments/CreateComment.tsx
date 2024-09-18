import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { BulletinButton, BulletTextInput } from '../../styles/shared'
import { CreateCommentDto, CreateCommentReplyDto } from '../../utils/types'
import { validateCookie } from '../../utils/helpers'
import {
    usePostCommentMutation,
    usePostCommentReplyMutation,
} from '../../utils/store/comment'

interface CreateCommentFormProps {
    text: string
}
interface CreateCommentProps {
    articleId: number
    onCreateComment: () => void
    isReplying?: boolean
    replyingTo?: string
    threadId?: number
}

export const CreateComment = ({
    articleId,
    onCreateComment,
    isReplying = false,
    replyingTo,
    threadId,
}: CreateCommentProps) => {
    const { register, handleSubmit, reset } = useForm<CreateCommentFormProps>()
    const [createComment, { isLoading }] = usePostCommentMutation()
    const [createReply, { isLoading: loadingReplies }] =
        usePostCommentReplyMutation()
    const onSubmit: SubmitHandler<CreateCommentFormProps> = (data) => {
        const accessToken = validateCookie('TOKEN')
        if (!accessToken) return

        if (isReplying && threadId) {
            const reply: CreateCommentReplyDto = {
                text: data.text,
                articleId,
                publishedAt: new Date().toISOString(),
                accessToken,
                threadId,
            }
            createReply(reply).then(() => {
                reset()
                onCreateComment()
            })
        } else {
            const comment: CreateCommentDto = {
                text: data.text,
                articleId,
                publishedAt: new Date().toISOString(),
                accessToken,
            }
            createComment(comment).then(() => {
                reset()
                onCreateComment()
            })
        }
    }
    return (
        <CreateCommentWrapper>
            {isReplying && <span>Replying to {replyingTo}</span>}
            <CreateCommentForm onSubmit={handleSubmit(onSubmit)}>
                <BulletTextInput
                    type="text"
                    placeholder="Write a comment"
                    $width="100%"
                    {...register('text', { required: true })}
                />
                <BulletinButton type="submit">
                    {isLoading || loadingReplies ? '...' : 'Send'}
                </BulletinButton>
            </CreateCommentForm>
        </CreateCommentWrapper>
    )
}

const CreateCommentForm = styled.form`
    display: flex;
    gap: 8px;
`
const CreateCommentWrapper = styled.div`
    padding: 8px;

    span {
        background: #dfdfdf;
        width: max-content;
        display: block;
        padding: 0 16px;
        margin: 0 8px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        box-sizing: border-box;
    }
`
