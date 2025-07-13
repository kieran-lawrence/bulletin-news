import React, { ReactNode, useState } from 'react'
import { Comment as CommentType, User } from '../../utils/types'
import styled from 'styled-components'
import { formatDistance } from 'date-fns'
import { useAuth } from '../../contexts/AuthContext'
import { userIsAdmin, userIsModerator } from '../../utils/helpers'
import { FaReply, FaFlag, FaThumbsUp } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { CreateComment } from './CreateComment'
import { getInitials, getShortenedName } from '../../utils/utils'
import {
    usePostCommentLikeMutation,
    usePostStatusUpdateMutation,
} from '../../utils/store/comment'

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

type ByParent = Record<number, CommentType[]>
export const CommentsSection = ({
    comments,
    onCreateComment,
}: CommentsSectionProps) => {
    // Record to hold comments grouped by parent ID
    const byParent: ByParent = {}

    // Iterate through comments and group them by parent ID
    comments.forEach((comment) => {
        // Use comment.parent.id if it exists, otherwise use 0 for top-level comments
        const parentId = comment.parent?.id || 0
        // Initialize the array for this parent ID if it doesn't exist
        if (!byParent[parentId]) byParent[parentId] = []
        // Push the comment into the appropriate parent ID array
        byParent[parentId].push(comment)
    })
    // Recursivly render comments in a tree structure
    const renderTree = (parentId: number = 0) => {
        return (byParent[parentId] || []).map((comment) => (
            <React.Fragment key={comment.id}>
                <Comment
                    comment={comment}
                    isFirstInThread={!!comment.parent}
                    author={comment.author}
                    onCreateComment={onCreateComment}
                />
                {renderTree(comment.id)}
            </React.Fragment>
        ))
    }
    return <>{renderTree()}</>
}

const Comment = ({
    comment,
    isFirstInThread,
    author,
    onCreateComment,
}: CommentProps) => {
    const { user } = useAuth()
    const userInitials = getInitials(author.name)
    const [isReplying, setIsReplying] = useState(false)
    const isAuthor = user?.email === author.email
    const [hasLikedComment, setHasLikedComment] = useState(
        () =>
            comment.likes?.some((like) => like.user?.email === user?.email) ||
            false,
    )
    const [hasReportedComment, setHasReportedComment] = useState(
        () =>
            comment.flags?.some((flag) => flag.user?.email === user?.email) ||
            false,
    )
    const [likeCount, setLikeCount] = useState(comment.likeCount)
    const replyingTo = getShortenedName(comment.author)
    const [likeComment] = usePostCommentLikeMutation()
    const [reportComment] = usePostStatusUpdateMutation()

    const handleReply = () => {
        onCreateComment()
        setIsReplying(false)
    }
    const handleReport = () => {
        if (hasReportedComment) {
            return
        }
        if (!user) {
            console.warn('User not logged in')
            return
        }
        reportComment({
            commentId: comment.id,
            status: 'FLAGGED',
            email: user.email, // We use email because bulletin doesn't use auth0 like the comments system does so we don't have a shared userid
        }).then(() => {
            setHasReportedComment(true)
        })
    }
    const handleLike = () => {
        if (hasLikedComment) {
            return
        }
        if (!user) {
            console.warn('User not logged in')
            return
        }
        likeComment({
            commentId: comment.id,
            email: user.email,
        }).then(() => {
            setHasLikedComment(true)
            setLikeCount((prev) => prev + 1)
        })
    }

    return (
        <CommentContainer>
            <CommentWrapper $hasAdditionalPadding={isFirstInThread}>
                <CommentAvatar>{userInitials}</CommentAvatar>
                <CommentContentWrapper>
                    <div className="commentHeader">
                        <CommentAuthor>
                            {getShortenedName(comment.author)}
                            {['ADMIN', 'MODERATOR'].includes(
                                comment.author.role,
                            ) && <span className="userRole">STAFF</span>}
                            <time dateTime={comment.createdAt}>
                                {formatDistance(
                                    new Date(comment.createdAt),
                                    new Date(),
                                    { addSuffix: true },
                                )}
                            </time>
                        </CommentAuthor>
                        {user &&
                            (userIsModerator(user) || userIsAdmin(user)) && (
                                <CommentModerationButton>
                                    Moderate
                                </CommentModerationButton>
                            )}
                    </div>
                    {comment.parent && (
                        <span className="replyingTo">
                            in reply to{' '}
                            {getShortenedName(comment.parent.author)}
                        </span>
                    )}
                    <div>{renderRichText(comment.content)}</div>
                    {/* Contains the reply, report etc actions a user can take */}
                    <CommentActions>
                        <IconContext.Provider
                            value={{ className: 'commentActionIcons' }}
                        >
                            {!isAuthor && (
                                <button
                                    className="commentAction"
                                    onClick={() => setIsReplying(!isReplying)}
                                >
                                    <FaReply />
                                    Reply
                                </button>
                            )}
                            {!isAuthor && (
                                <button
                                    className={`commentAction ${
                                        hasReportedComment && 'active'
                                    }`}
                                    onClick={handleReport}
                                >
                                    <FaFlag />{' '}
                                    {hasReportedComment ? 'Reported' : 'Report'}
                                </button>
                            )}
                            {!isAuthor && (
                                <button
                                    className={`commentAction ${
                                        hasLikedComment && 'active'
                                    }`}
                                    onClick={handleLike}
                                >
                                    <FaThumbsUp /> Like {likeCount}
                                </button>
                            )}
                        </IconContext.Provider>
                    </CommentActions>
                </CommentContentWrapper>
            </CommentWrapper>
            {/* When a user clicks 'Reply' this shows the form */}
            {isReplying && (
                <CreateComment
                    articleId={comment.articleId}
                    authorEmail={user?.email}
                    onCreateComment={handleReply}
                    isReplying={isReplying}
                    replyingTo={replyingTo}
                    threadId={comment.id}
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

    &:last-of-type {
        border-bottom: none;
    }
`
const CommentWrapper = styled.div<{ $hasAdditionalPadding?: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;

    padding: ${(props) =>
        props.$hasAdditionalPadding ? '16px 0 16px 32px' : '16px 0'};
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
    .commentHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 2px;
    }
`
const CommentAuthor = styled.address`
    display: flex;
    align-items: center;
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
    .userRole {
        margin-left: 8px;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 400;
        color: #7a7a7a;
        border: 1px solid #7a7a7a;
        border-radius: 4px;
        padding: 1px 4px;
    }
`
const CommentModerationButton = styled.button`
    background: none;
    border: 1px solid #7a7a7a;
    font-size: 14px;
    color: #7a7a7a;
    border-radius: 4px;
    padding: 4px 8px;
    &:hover {
        cursor: pointer;
        color: #e9353b;
    }
    &.active {
        color: #e9353b;
    }
`
const CommentActions = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    align-items: center;
    gap: 16px;
    font-size: 15px;
    color: #7a7a7a;
    padding-top: 8px;
    .commentAction {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        font-size: inherit;
        color: inherit;
        &:hover {
            cursor: pointer;
            text-decoration: underline;
            color: #e9353b;
        }
        &.active {
            color: #e9353b;
        }
    }

    .commentActionIcons {
        padding-right: 4px;
    }
`

export const renderRichText = (input: string): ReactNode[] => {
    const paragraphs = input.split(/\n/) // Handle new lines as paragraph breaks

    // Loops over each paragraph and renders it as a <p> element
    return paragraphs.map((paragraph, index) => (
        <p key={index}>{renderInlineElements(paragraph)}</p>
    ))
}

// Define the inline rules for rendering rich text, converts inline markdown-like syntax to HTML elements
const INLINE_RULES = [
    {
        regex: /\*\*(.+?)\*\*/, // Filters on **text** (used for bold)
        render: (m: string, i: number) => <strong key={i}>{m}</strong>,
    },
    {
        regex: /__(.+?)__/, // Filters on __text__ (used for italic)
        render: (m: string, i: number) => <em key={i}>{m}</em>,
    },
    {
        regex: /~~(.+?)~~/, // Filters on ~~text~~ (used for strikethrough)
        render: (m: string, i: number) => <s key={i}>{m}</s>,
    },
    {
        regex: /\+\+(.+?)\+\+/, // Filters on ++text++ (used for underline)
        render: (m: string, i: number) => <u key={i}>{m}</u>,
    },
]

type MatchRule = {
    /** Starting index of the matched block  */
    index: number
    /** Length of the matched block */
    length: number
    /** Function that returns a ReactNode, used to render the matched text when invoked */
    render: () => ReactNode
}
const renderInlineElements = (text: string): ReactNode[] => {
    let elements: ReactNode[] = []
    let remainingText = text
    let i = 0

    // While there is still text to process, find the earliest match of any inline rule
    while (remainingText.length > 0) {
        let earliestMatch: MatchRule | null = null

        // Loop through each inline rule to find a matching pattern
        for (const rule of INLINE_RULES) {
            // Returns the first match of the current rule in the remaining text
            const match = rule.regex.exec(remainingText)
            if (
                match &&
                (earliestMatch === null || match.index < earliestMatch.index)
            ) {
                // If a match is found, create a MatchRule object with the index, length, and render function
                earliestMatch = {
                    index: match.index,
                    length: match[0].length,
                    render: () => rule.render(match[1]!, i++),
                }
            }
        }

        // Check if an earliest match was found, if so, push the text before the match and the rendered element to the elements array
        if (earliestMatch) {
            if (earliestMatch.index > 0) {
                elements.push(remainingText.slice(0, earliestMatch.index))
            }
            elements.push(earliestMatch.render())
            remainingText = remainingText.slice(
                earliestMatch.index + earliestMatch.length,
            )
        } else {
            // If no match was found, push the remaining text as a plain text element
            elements.push(remainingText)
            break
        }
    }

    return elements
}
