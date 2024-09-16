import React from 'react'
import { Comment as CommentType } from '../../utils/types'
import styled from 'styled-components'
import { formatDistance } from 'date-fns'
import { useAuth } from '../../contexts/AuthContext'
import { userIsAdmin, userIsModerator } from '../../utils/helpers'
import { FaReply, FaFlag, FaTrash } from 'react-icons/fa'
import { IconContext } from 'react-icons'

interface CommentsSectionProps {
    comments: CommentType[]
}
interface CommentProps {
    comment: CommentType
}
export const CommentsSection = ({ comments }: CommentsSectionProps) => {
    return comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
    ))
}

const Comment = ({ comment }: CommentProps) => {
    const user = useAuth()
    const userInitials =
        comment.user.firstName.substring(0, 1) +
        comment.user.lastName.substring(0, 1)
    return (
        <CommentWrapper>
            <CommentAvatar>{userInitials}</CommentAvatar>
            <CommentContentWrapper>
                <CommentAuthor>
                    {`${
                        comment.user.firstName
                    } ${comment.user.lastName.substring(0, 1)}`}
                    <time dateTime={comment.publishedAt}>
                        {formatDistance(
                            new Date(comment.publishedAt),
                            new Date(),
                            { addSuffix: true },
                        )}
                    </time>
                </CommentAuthor>
                {comment.text}
                <CommentActions>
                    <IconContext.Provider
                        value={{ className: 'commentActionIcons' }}
                    >
                        <div className="commentAction">
                            <FaReply />
                            Reply
                        </div>
                        <div className="commentAction">
                            <FaFlag /> Report
                        </div>
                        {user &&
                            (userIsModerator(user) || userIsAdmin(user)) && (
                                <div className="commentAction">
                                    <FaTrash />
                                    Delete
                                </div>
                            )}
                    </IconContext.Provider>
                </CommentActions>
            </CommentContentWrapper>
        </CommentWrapper>
    )
}
const CommentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #6565659f;
    padding: 16px 0;
    &:last-child {
        border-bottom: none;
    }
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
