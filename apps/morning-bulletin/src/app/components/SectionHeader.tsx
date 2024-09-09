import Link from 'next/link'
import styled from 'styled-components'

type Props = {
    headerText: string
    href?: string
    width?: string
    showSeeMoreText?: boolean
}
export const SectionHeader = ({
    headerText,
    href,
    width,
    showSeeMoreText,
}: Props) => {
    return (
        <StyledSectionHeader width={width}>
            <SectionHeaderStyle>{headerText}</SectionHeaderStyle>
            {showSeeMoreText ? (
                <StyledLink href={href ? href : '/'}>See More</StyledLink>
            ) : (
                <StyledLink href={href ? href : '/'} />
            )}
        </StyledSectionHeader>
    )
}
const StyledSectionHeader = styled.div<{
    width?: string
}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${(props) => props.width || '100%'};
    margin-bottom: 25px;
`
const SectionHeaderStyle = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: #1f1f1f;
`
const StyledLink = styled(Link)`
    font-size: 14px;
    color: #e9353b;
    font-weight: 600;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`
