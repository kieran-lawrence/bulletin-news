import React, { useState } from 'react'
import {
    Comment as CommentType,
    CreateCommentReplyDto,
} from '../../utils/types'
import { User } from '@repo/api'
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
    usePostCommentReplyMutation,
    usePostCommentUpdateMutation,
    usePostStatusUpdateMutation,
} from '../../utils/store/comment'
import { FaPencil } from 'react-icons/fa6'
import { RichTextInput } from './RichText'
import { Descendant } from 'slate'

interface CommentsSectionProps {
    comments: CommentType[]
    refetchComments: () => void
}
interface CommentProps {
    comment: CommentType
    isFirstInThread?: boolean
    author: User
    refetchComments: () => void
}

type ByParent = Record<number, CommentType[]>
export const CommentsSection = ({
    comments,
    refetchComments,
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
                    refetchComments={refetchComments}
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
    refetchComments,
}: CommentProps) => {
    const { user } = useAuth()
    const userInitials = getInitials(author)
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
    const [isEditing, setIsEditing] = useState(false)

    const [likeCount, setLikeCount] = useState(comment.likeCount)
    const replyingTo = getShortenedName(comment.author)
    const [likeComment] = usePostCommentLikeMutation()
    const [updateCommentStatus] = usePostStatusUpdateMutation()
    const [updateComment] = usePostCommentUpdateMutation()
    const [createReply] = usePostCommentReplyMutation()

    // Moderation dropdown state
    const [showModerationMenu, setShowModerationMenu] = useState(false)

    const handleReply = (textBlocks: Descendant[]) => {
        const reply: CreateCommentReplyDto = {
            content: JSON.stringify(textBlocks),
            commentId: comment.id,
            articleId: comment.articleId,
            authorEmail: user?.email || '',
        }
        createReply(reply)
        setIsReplying(false)
    }
    const handleCommentUpdate = (textBlocks: Descendant[]) => {
        const content = JSON.stringify(textBlocks)
        updateComment({
            commentId: comment.id,
            content,
            email: user?.email || '',
        }).then(() => {
            setIsEditing(false)
            setTimeout(() => {
                refetchComments()
            }, 1000)
        })
    }
    const handleReport = () => {
        if (hasReportedComment) {
            return
        }
        if (!user) {
            console.warn('User not logged in')
            return
        }
        updateCommentStatus({
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

    // Moderation actions
    const handleReject = () => {
        if (!user) {
            console.warn('User not logged in')
            return
        }

        updateCommentStatus({
            commentId: comment.id,
            status: 'REJECTED',
            email: user.email,
        }).then(() => {
            setTimeout(() => {
                refetchComments()
            }, 1000)
        })
        setShowModerationMenu(false)
    }

    // Close menu on click outside
    React.useEffect(() => {
        if (!showModerationMenu) return
        const handleClick = (e: MouseEvent) => {
            setShowModerationMenu(false)
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [showModerationMenu])

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
                                <div style={{ position: 'relative' }}>
                                    <CommentModerationButton
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setShowModerationMenu((v) => !v)
                                        }}
                                        aria-haspopup="true"
                                        aria-expanded={showModerationMenu}
                                    >
                                        Moderate
                                    </CommentModerationButton>
                                    {showModerationMenu && (
                                        <ModerationDropdownMenu
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button onClick={handleReject}>
                                                Reject
                                            </button>
                                            {/* TODO: Update to use correct URL based on env */}
                                            <a
                                                href={`http://localhost:5173/moderate#commentCard-${comment.id}`}
                                            >
                                                View in Dashboard
                                            </a>
                                            {/* TODO: This anchor doesn't exist on the comments dashboard yet */}
                                            <a
                                                href={`http://localhost:5173/users#userCard-${comment.id}`}
                                            >
                                                Manage User
                                            </a>
                                        </ModerationDropdownMenu>
                                    )}
                                </div>
                            )}
                    </div>
                    {comment.parent && (
                        <span className="replyingTo">
                            in reply to{' '}
                            {getShortenedName(comment.parent.author)}
                        </span>
                    )}
                    <CommentContentContainer
                        className={isEditing ? 'editing' : ''}
                    >
                        <>
                            {/* This is the input that displays the users comment.  */}
                            <RichTextInput
                                onSubmit={
                                    isEditing
                                        ? handleCommentUpdate
                                        : handleReply
                                }
                                readOnly={!isEditing}
                                showToolbar={isEditing}
                                initialValue={JSON.parse(comment.content)}
                                mode="edit"
                            />
                            {isEditing ? (
                                <small className="editActions">
                                    <a
                                        role="button"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        cancel
                                    </a>
                                </small>
                            ) : (
                                isAuthor && (
                                    <button
                                        className="editButton"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <FaPencil />
                                        Edit
                                    </button>
                                )
                            )}
                        </>
                    </CommentContentContainer>
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
            {/* When a user clicks 'Reply' this shows the Slate comment input */}
            {isReplying && (
                <CreateComment
                    articleId={comment.articleId}
                    authorEmail={user?.email}
                    isReplying={isReplying}
                    replyingTo={replyingTo}
                    threadId={comment.id}
                    setIsReplying={setIsReplying}
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
const CommentContentContainer = styled.div`
    &.editing {
        margin-top: 16px;

        .richTextEditor {
            flex: 1;
            padding: 6px 12px;
            background: white;
            border: 1px solid #6565659f;
            border-radius: 4px;
        }
    }
    .editActions {
        font-size: 13px;

        a {
            color: #e50914;
            text-decoration: none;
            cursor: pointer;
        }
    }
    .editButton {
        padding: 0;
        height: 16px;
        display: flex;
        gap: 4px;
        align-items: center;
        background: none;
        border: none;
        font-size: 13px;
        color: #7a7a7a;
        &:hover {
            cursor: pointer;
            text-decoration: underline;
            color: #e9353b;
        }
        &.active {
            color: #e9353b;
        }
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
    position: relative;
    &:hover {
        cursor: pointer;
        color: #e9353b;
    }
    &.active {
        color: #e9353b;
    }
`

const ModerationDropdownMenu = styled.div`
    position: absolute;
    top: 110%;
    right: 0;
    background: #fff;
    border: 1px solid #7a7a7a;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    z-index: 10;
    min-width: 140px;
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    a,
    button {
        text-decoration: none;
        background: none;
        border: none;
        color: #e9353b;
        font-size: 14px;
        padding: 4px 8px;
        text-align: right;
        &:hover {
            background: #f7eaea;
            cursor: pointer;
        }
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
