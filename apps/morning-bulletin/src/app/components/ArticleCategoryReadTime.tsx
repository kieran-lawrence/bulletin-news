import styled from 'styled-components'
import { CommentCount } from './CommentCount'

type Props = {
    categoryTextColor?: string
    articleCategory?: string
    articleReadTime?: number
    fontSize?: string
    fontColor?: string
    bold?: boolean
    articleId?: number
}
export const ArticleCategoryReadTime = ({
    categoryTextColor,
    articleCategory,
    articleReadTime,
    fontSize,
    fontColor,
    bold,
    articleId,
}: Props) => {
    return (
        <StyledArticleTitle
            $fontSize={fontSize}
            $fontColor={fontColor}
            $categoryTextColor={categoryTextColor}
            $bold={bold}
        >
            <span>{articleCategory}</span> • {articleReadTime} min read
            {articleId && <CommentCount articleId={articleId} />}
        </StyledArticleTitle>
    )
}

const StyledArticleTitle = styled.div<{
    $fontSize?: string
    $fontColor?: string
    $bold?: boolean
    $categoryTextColor?: string
}>`
    display: flex;
    align-items: center;
    font-size: ${(props) => props.$fontSize || '16px'};
    color: ${(props) => props.$fontColor || '#3c3c3c'};

    span {
        color: ${(props) => props.$categoryTextColor || '#e9353b'};
        font-weight: ${(props) => (props.$bold ? 600 : 400)};
        text-transform: capitalize;
    }
`
