import styled from 'styled-components'
import { CreateComment } from './CreateComment'
import { NoCommentsYet } from './NoCommentsYet'
import { CommentsSection } from './Comment'
import { useGetCommentsByArticleIdQuery } from '../../utils/store/comment'
import { FullScreenLoaderWrapper } from '../../styles/shared'
import { Loader } from '../Loader'
import Link from 'next/link'

interface CommentsContainerProps {
    articleId: number
}
export const CommentsContainer = ({ articleId }: CommentsContainerProps) => {
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
        <StyledCommentsContainer>
            <CommentDisclaimer>
                Bulletin reserves the right to remove any comment that is deemed
                inappropriate. <br />
                Please review our{' '}
                <Link href="/terms-of-service">community guidelines</Link> for
                more information.
            </CommentDisclaimer>
            <CreateComment articleId={articleId} onCreateComment={refetch} />
            {comments && comments.length > 0 ? (
                <CommentsSection
                    comments={comments}
                    onCreateComment={refetch}
                />
            ) : (
                <NoCommentsYet />
            )}
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
