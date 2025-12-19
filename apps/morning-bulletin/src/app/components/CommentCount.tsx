import styled from 'styled-components'
import { useGetCommentsCountQuery } from '../utils/store/comment'
import { BiCommentDetail } from 'react-icons/bi'

export const CommentCount = ({ articleId }: { articleId: number }) => {
    const { data, isLoading, status } = useGetCommentsCountQuery(articleId)

    if (isLoading) {
        return null
    }
    // There will be no data if comments are disabled for the article (or an error occurs)
    if (!data) {
        return null
    }

    return (
        <CommentCountStyle>
            <BiCommentDetail />
            {data.count ?? 0}
        </CommentCountStyle>
    )
}

const CommentCountStyle = styled.span`
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #3c3c3c;
    margin-left: 8px;
    gap: 4px;
`
