import styled from 'styled-components'
import { CreateComment } from './CreateComment'
import { NoCommentsYet } from './NoCommentsYet'
import { CommentsSection } from './Comment'
import { useGetCommentsByArticleIdQuery } from '../../utils/store/comment'
import { FullScreenLoaderWrapper } from '../../styles/shared'
import { Loader } from '../Loader'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'

interface CommentsContainerProps {
    articleId: number
}
export const CommentsContainer = ({ articleId }: CommentsContainerProps) => {
    const { user } = useAuth()
    const {
        data: comments,
        isLoading,
        refetch,
    } = useGetCommentsByArticleIdQuery(articleId)
    return isLoading ? (
        <FullScreenLoaderWrapper>
            <Loader />
        </FullScreenLoaderWrapper>
    ) : (
        <StyledCommentsContainer id="commentsContainer">
            <CommentDisclaimer>
                Bulletin reserves the right to remove any comment that is deemed
                inappropriate. <br />
                Please review our{' '}
                <Link href="/terms-of-service">community guidelines</Link> for
                more information.
            </CommentDisclaimer>
            <CreateComment
                articleId={articleId}
                authorEmail={user?.email}
                onCreateComment={refetch}
            />
            {comments && comments.length > 0 ? (
                <CommentsSection
                    comments={comments}
                    onCreateComment={refetch}
                />
            ) : (
                <NoCommentsYet />
            )}
            <CommentActions>
                <Link href="#commentsContainer">Top of Comments</Link>
                <Link href="#articlePage">Top of Page</Link>
            </CommentActions>
        </StyledCommentsContainer>
    )
}

const StyledCommentsContainer = styled.div`
    background: #f5f5f5;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
`
const CommentDisclaimer = styled.span`
    padding: 12px 18px;
    text-align: justify;
    font-size: 14px;
    color: #383838;

    a {
        color: #e50914;
    }
`
const CommentActions = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;

    a {
        font-size: 14px;
        color: #e50914;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`
