import { truncateArticleText } from '../utils/helpers'
import styled from 'styled-components'

type Props = {
    description: string
    truncAt: number
    fontSize?: string
    fontColor?: string
}
export const ArticleDescription = ({
    description,
    truncAt,
    fontSize,
    fontColor,
}: Props) => {
    return (
        <StyledArticleTitle $fontSize={fontSize} $fontColor={fontColor}>
            {truncateArticleText(description, truncAt)}
        </StyledArticleTitle>
    )
}

const StyledArticleTitle = styled.div<{
    $fontSize?: string
    $fontColor?: string
}>`
    font-size: ${(props) => props.$fontSize || '16px'};
    color: ${(props) => props.$fontColor || '#3c3c3c'};
    font-family: 'Noto Serif', serif;
`
