import styled from 'styled-components'
import { CreateComment } from './CreateComment'
import { NoCommentsYet } from './NoCommentsYet'
import { CommentsSection } from './Comment'
import { useGetCommentsByArticleIdQuery } from '../../utils/store/comment'

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
        <>Loading</>
    ) : (
        <StyledCommentsContainer>
            <CreateComment articleId={articleId} onCreateComment={refetch} />
            {comments && comments.length > 0 ? (
                <CommentsSection comments={comments} />
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
