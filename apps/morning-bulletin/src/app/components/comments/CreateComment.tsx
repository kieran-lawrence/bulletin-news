import styled from 'styled-components'
import { CreateCommentDto, CreateCommentReplyDto } from '../../utils/types'
import { validateCookie } from '../../utils/helpers'
import {
    usePostCommentMutation,
    usePostCommentReplyMutation,
} from '../../utils/store/comment'
import React, { useEffect, useState } from 'react'
import { RichTextInput } from './RichText'
import { Descendant } from 'slate'
import { CommentPending } from './CommentPending'

interface CreateCommentProps {
    articleId: number
    authorEmail?: string
    isReplying?: boolean
    setIsReplying?: (isReplying: boolean) => void
    replyingTo?: string
    threadId?: number
}

export const CreateComment = ({
    articleId,
    authorEmail,
    setIsReplying,
    isReplying = false,
    replyingTo,
    threadId,
}: CreateCommentProps) => {
    const [createComment] = usePostCommentMutation()
    const [createReply] = usePostCommentReplyMutation()
    const [showPendingModal, setShowPendingModal] = useState(false)

    const onSubmit = (data: Descendant[]) => {
        const accessToken = validateCookie('TOKEN')
        if (!accessToken || !authorEmail) return

        const parsedComment = JSON.stringify(data)
        if (isReplying && threadId) {
            const reply: CreateCommentReplyDto = {
                content: parsedComment,
                articleId,
                commentId: threadId,
                authorEmail,
            }
            createReply(reply)
            setIsReplying?.(false)
        } else {
            const comment: CreateCommentDto = {
                content: parsedComment,
                articleId,
                authorEmail,
            }
            createComment(comment)
        }
    }

    useEffect(() => {
        if (showPendingModal) {
            const timer = setTimeout(() => {
                setShowPendingModal(false)
            }, 2000) // Hide after 3 seconds
            return () => clearTimeout(timer)
        }
    }, [showPendingModal])

    return (
        <CreateCommentWrapper>
            {showPendingModal && (
                <CommentPending setIsVisible={setShowPendingModal} />
            )}
            <RichTextInput
                initialValue={[
                    {
                        type: 'paragraph',
                        children: [{ text: '' }],
                    },
                ]}
                readOnly={false}
                showToolbar={true}
                onSubmit={onSubmit}
                replyingTo={replyingTo}
                mode="comment"
            />
        </CreateCommentWrapper>
    )
}

// Wrapper around the RichTextInput to apply styles
export const CreateCommentWrapper = styled.div`
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    .replyingTo {
        background: #dfdfdf;
        width: max-content;
        display: block;
        padding: 0 16px;
        margin: 0 8px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        box-sizing: border-box;
    }
    .editorContainer > .richTextEditor {
        flex: 1;
        padding: 6px 12px;
        background: white;
        border: 1px solid #6565659f;
        border-radius: 4px;
    }
`
