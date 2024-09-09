import styled from 'styled-components'

type Props = {
    categoryTextColor?: string
    articleCategory?: string
    articleReadTime?: number
    fontSize?: string
    fontColor?: string
    bold?: boolean
}
export const ArticleCategoryReadTime = ({
    categoryTextColor,
    articleCategory,
    articleReadTime,
    fontSize,
    fontColor,
    bold,
}: Props) => {
    return (
        <StyledArticleTitle
            fontSize={fontSize}
            fontColor={fontColor}
            categoryTextColor={categoryTextColor}
        >
            <span>{articleCategory}</span> • {articleReadTime} min read
        </StyledArticleTitle>
    )
}

const StyledArticleTitle = styled.div<{
    fontSize?: string
    fontColor?: string
    bold?: boolean
    categoryTextColor?: string
}>`
    font-size: ${(props) => props.fontSize || '16px'};
    color: ${(props) => props.fontColor || '#3c3c3c'};

    span {
        color: ${(props) => props.categoryTextColor || '#e9353b'};
        font-weight: ${(props) => (props.bold ? 600 : 400)};
        text-transform: capitalize;
    }
`
