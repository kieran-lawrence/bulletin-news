import React, { ReactNode, useState } from 'react'
import { Comment as CommentType, User } from '../../utils/types'
import styled from 'styled-components'
import { formatDistance } from 'date-fns'
import { useAuth } from '../../contexts/AuthContext'
import { userIsAdmin, userIsModerator } from '../../utils/helpers'
import { FaReply, FaFlag, FaTrash } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { CreateComment } from './CreateComment'
import { getInitials, getShortenedName } from '../../utils/utils'

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
    const replyingTo = getShortenedName(comment.author)

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
                        {getShortenedName(comment.author)}
                        <time dateTime={comment.createdAt}>
                            {formatDistance(
                                new Date(comment.createdAt),
                                new Date(),
                                { addSuffix: true },
                            )}
                        </time>
                    </CommentAuthor>
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
                                <div
                                    className="commentAction"
                                    onClick={() => setIsReplying(!isReplying)}
                                >
                                    <FaReply />
                                    Reply
                                </div>
                            )}
                            {!isAuthor && (
                                <div className="commentAction">
                                    <FaFlag /> Report
                                </div>
                            )}
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
            {/* When a user clicks 'Reply' this shows the form */}
            {isReplying && (
                <CreateComment
                    articleId={comment.articleId}
                    authorId={user?.id}
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
