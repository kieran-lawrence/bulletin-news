import React, { useState } from 'react'
import { Comment as CommentType, User } from '../../utils/types'
import styled from 'styled-components'
import { formatDistance } from 'date-fns'
import { useAuth } from '../../contexts/AuthContext'
import { userIsAdmin, userIsModerator } from '../../utils/helpers'
import { FaReply, FaFlag, FaTrash } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { CreateComment } from './CreateComment'

interface CommentsSectionProps {
    comments: CommentType[]
    onCreateComment: () => void
}
interface CommentProps {
    comment: CommentType
    isFirstInThread?: boolean
    author: User
    onCreateComment: () => void
}
type CommentAccumulator = {
    [key: number]: CommentType[]
}
export const CommentsSection = ({
    comments,
    onCreateComment,
}: CommentsSectionProps) => {
    // Group the comments by their threadId
    const groupedComments = groupCommentsByThread(comments)

    // Map the grouped comments to Comment components
    return Object.keys(groupedComments).map((threadId: string) =>
        groupedComments[Number(threadId)].map((comment, commentIndex) => (
            <Comment
                key={comment.id}
                comment={comment}
                isFirstInThread={commentIndex !== 0}
                author={groupedComments[Number(threadId)][0].user} // The author of the first comment in the thread is who we are replying to
                onCreateComment={onCreateComment}
            />
        )),
    )
}

const Comment = ({
    comment,
    isFirstInThread,
    author,
    onCreateComment,
}: CommentProps) => {
    const user = useAuth()
    const userInitials =
        comment.user.firstName.substring(0, 1) +
        comment.user.lastName.substring(0, 1)
    const [isReplying, setIsReplying] = useState(false)
    const replyingTo = getShortenedName(author)
    const isAuthor = user?.email === author.email

    const handleReply = () => {
        onCreateComment()
        setIsReplying(false)
    }

    return (
        <CommentContainer>
            <CommentWrapper $hasAdditionalPadding={isFirstInThread}>
                <CommentAvatar>{userInitials}</CommentAvatar>
                <CommentContentWrapper>
                    <CommentAuthor>
                        {getShortenedName(comment.user)}
                        <time dateTime={comment.publishedAt}>
                            {formatDistance(
                                new Date(comment.publishedAt),
                                new Date(),
                                { addSuffix: true },
                            )}
                        </time>
                    </CommentAuthor>
                    {isFirstInThread && (
                        <span className="replyingTo">
                            in reply to {replyingTo}
                        </span>
                    )}
                    {comment.text}
                    <CommentActions>
                        <IconContext.Provider
                            value={{ className: 'commentActionIcons' }}
                        >
                            {!isFirstInThread && !isAuthor && (
                                <div
                                    className="commentAction"
                                    onClick={() => setIsReplying(!isReplying)}
                                >
                                    <FaReply />
                                    Reply
                                </div>
                            )}
                            <div className="commentAction">
                                <FaFlag /> Report
                            </div>
                            {user &&
                                (userIsModerator(user) ||
                                    userIsAdmin(user)) && (
                                    <div className="commentAction">
                                        <FaTrash />
                                        Delete
                                    </div>
                                )}
                        </IconContext.Provider>
                    </CommentActions>
                </CommentContentWrapper>
            </CommentWrapper>
            {isReplying && (
                <CreateComment
                    articleId={comment.article.id}
                    onCreateComment={handleReply}
                    isReplying={isReplying}
                    replyingTo={replyingTo}
                    threadId={comment.thread.id}
                />
            )}
        </CommentContainer>
    )
}
const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #6565659f;
    padding: 16px 0;

    &:last-child {
        border-bottom: none;
    }
`
const CommentWrapper = styled.div<{ $hasAdditionalPadding?: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;

    padding: ${(props) =>
        props.$hasAdditionalPadding ? '16px 64px' : '16px 0'};
`
const CommentAvatar = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #de6676;
    font-weight: 500;
    display: grid;
    place-items: center;
`
const CommentContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: #383838;
    flex: 1;

    .replyingTo {
        color: #7a7a7a;
        font-size: 14px;
        padding: 0 0 4px 8px;
        font-weight: 400;
        font-style: italic;
    }
`
const CommentAuthor = styled.address`
    font-size: 18px;
    font-weight: 600;
    font-style: normal;
    color: #1f1f1f;
    time {
        padding-left: 8px;
        font-size: 15px;
        font-weight: 400;
        color: #7a7a7a;
    }
`
const CommentActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    color: #7a7a7a;
    width: 40%;
    padding-top: 8px;
    .commentAction {
        display: flex;
        align-items: center;
        &:hover {
            cursor: pointer;
            text-decoration: underline;
            color: #e9353b;
        }
    }

    .commentActionIcons {
        padding-right: 4px;
    }
`

/** Groups individual comments by their thread */
const groupCommentsByThread = (comments: CommentType[]) => {
    return comments.reduce(
        (acc: CommentAccumulator, comment) => {
            // Get the threadId from the comment
            const threadId = comment.thread.id

            // If the threadId is not already a key in the accumulator, create a new array
            if (!acc[threadId]) {
                acc[threadId] = []
            }

            // Add the comment to the array associated with the threadId
            acc[threadId].push(comment)

            // Return the grouped comments
            return acc
        },
        {}, // Current value, (nothing)
    )
}
const getShortenedName = (user: User): string => {
    return `${user.firstName} ${user.lastName.substring(0, 1)}`
}
