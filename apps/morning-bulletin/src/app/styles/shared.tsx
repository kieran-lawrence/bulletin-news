import styled from 'styled-components'
import Link from 'next/link'
export const SectionWrapperStyle = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
`
export const ArticleSectionImageStyle = styled.div`
    display: flex;
    justify-content: left;
    place-items: center;
    flex-direction: column;
    padding: 15px 0;

    img {
        max-width: 65%;
        border-radius: 5px;
        margin-right: auto;
    }
    div {
        padding: 8px;
        max-width: 65%;
        font-size: 14px;
        margin-right: auto;
    }
`
export const ArticleSectionStyle = styled.div`
    margin: 0 10px 20px 0;
    font-size: 16px;
    h2 {
        font-size: 22px;
        font-weight: 600;
        padding-left: 5px;
    }
`
export const QuoteContainerStyle = styled.div`
    border-left: 5px solid #e9353b;
    padding-left: 15px;
    margin: 24px 72px;
    font-size: 20px;
    font-style: italic;
    font-weight: 400;
    display: flex;
    justify-content: center;
    flex-direction: column;

    small {
        margin-top: 8px;
        font-size: 14px;
        font-style: normal;
    }
`
export const BulletinButton = styled.button<{
    $padding?: string
    $fontWeight?: number
    $fontSize?: string
}>`
    border: none;
    background-color: #e50914;
    color: #f1f1f1;
    border-radius: 5px;
    font-size: ${(props) => props.$fontSize || '16px'};
    font-weight: ${(props) => props.$fontWeight || 400};
    padding: ${(props) => props.$padding || '10px 20px'};
    &:hover {
        cursor: pointer;
        background: #c72a30;
    }
    transition: background 0.2s ease;
`
export const BulletinButtonAlt = styled.button<{
    $padding?: string
    $fontWeight?: number
    $fontSize?: string
}>`
    border: 1px solid #e50914;
    background: none;

    border-radius: 5px;
    font-size: ${(props) => props.$fontSize || '16px'};
    font-weight: ${(props) => props.$fontWeight || 400};
    padding: ${(props) => props.$padding || '10px 20px'};
    text-decoration: none;
    &:hover {
        cursor: pointer;
        background: #e50914;
        color: #f1f1f1;
    }
    transition: background 0.2s ease;
`
export const BulletinLinkButton = styled(Link)<{
    $padding?: string
    $fontWeight?: number
    $fontSize?: string
}>`
    border: none;
    background-color: #e50914;
    color: #f1f1f1;
    border-radius: 5px;
    font-size: ${(props) => props.$fontSize || '16px'};
    font-weight: ${(props) => props.$fontWeight || 400};
    padding: ${(props) => props.$padding || '10px 20px'};
    text-decoration: none;
    &:hover {
        cursor: pointer;
        background: #c72a30;
    }
    transition: background 0.2s ease;
`
