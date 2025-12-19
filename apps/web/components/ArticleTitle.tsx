import styled from 'styled-components'
import { truncateArticleText } from '../utils/helpers'

type Props = {
    shouldGrow?: boolean
    title: string
    fontSize?: string
    truncAt: number
    fontColor?: string
}
export const ArticleTitle = ({
    shouldGrow,
    title,
    fontSize,
    truncAt,
    fontColor,
}: Props) => {
    return (
        <StyledArticleTitle
            $shouldGrow={shouldGrow}
            $fontSize={fontSize}
            $fontColor={fontColor}
        >
            {truncateArticleText(title, truncAt)}
        </StyledArticleTitle>
    )
}
const StyledArticleTitle = styled.h1<{
    $shouldGrow?: boolean
    $fontSize?: string
    $fontColor?: string
}>`
    flex-grow: ${(props) => (props.$shouldGrow ? 1 : 0)};
    font-size: ${(props) => props.$fontSize || '24px'};
    color: ${(props) => props.$fontColor || '#1f1f1f'};
    font-family: 'Noto Serif', serif;
`
