import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

interface HeaderLogoProps {
    level?: 'h1' | 'h2'
}
export const HeaderLogo = ({ level }: HeaderLogoProps) => {
    return (
        <HeaderLogoWrap href="/">
            {level === 'h1' ? <h1>Bulletin</h1> : <h2>Bulletin</h2>}
            <HeaderLogoImage
                src="/BulletinLogoSmall.png"
                alt="Bulletin Logo"
                width={64}
                height={64}
            />
        </HeaderLogoWrap>
    )
}
const HeaderLogoWrap = styled(Link)`
    color: #e9353b;
    margin: 0;
    display: flex;
    align-items: center;
    text-decoration: none;
    h1,
    h2 {
        margin: 0;
        font-size: 48px;

        font-weight: 600;
        font-family: 'Noto Serif', serif;
    }
`
const HeaderLogoImage = styled(Image)`
    width: 'auto';
    margin: 0 5px 0 2px;
    aspect-ratio: 1/1;
`
