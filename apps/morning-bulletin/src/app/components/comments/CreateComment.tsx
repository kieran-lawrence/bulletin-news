import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { BulletinButton, BulletTextInput } from '../../styles/shared'
import { CreateCommentDto } from '../../utils/types'
import { validateCookie } from '../../utils/helpers'
import { usePostCommentMutation } from '../../utils/store/comment'
import Link from 'next/link'

interface CreateCommentFormProps {
    text: string
}
interface CreateCommentProps {
    articleId: number
    onCreateComment: () => void
}

export const CreateComment = ({
    articleId,
    onCreateComment,
}: CreateCommentProps) => {
    const { register, handleSubmit, reset } = useForm<CreateCommentFormProps>()
    const [createComment, { isLoading }] = usePostCommentMutation()
    const onSubmit: SubmitHandler<CreateCommentFormProps> = (data) => {
        const accessToken = validateCookie('TOKEN')
        if (!accessToken) return
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
    return (
        <>
            <CommentDisclaimer>
                Bulletin reserves the right to remove any comment that is deemed
                inappropriate. <br />
                Please review our{' '}
                <Link href="/terms-of-service">community guidelines</Link> for
                more information.
            </CommentDisclaimer>
            <CreateCommentForm onSubmit={handleSubmit(onSubmit)}>
                <BulletTextInput
                    type="text"
                    placeholder="Write a comment"
                    $width="100%"
                    {...register('text', { required: true })}
                />
                <BulletinButton type="submit">
                    {isLoading ? '...' : 'Send'}
                </BulletinButton>
            </CreateCommentForm>
        </>
    )
}
const CommentDisclaimer = styled.span`
    padding: 12px 18px;
    text-align: justify;
    font-size: 14px;
    color: #383838;

    a {
        color: #e50914;
    }
`
const CreateCommentForm = styled.form`
    display: flex;
    gap: 8px;
`
