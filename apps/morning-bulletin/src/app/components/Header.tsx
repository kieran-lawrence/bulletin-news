import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'

export const Header = () => {
    return (
        <HeaderStyle>
            <HeaderLink href="/">
                Bulletin
                <HeaderLogo
                    src="/BulletinLogoSmall.png"
                    alt="Bulletin Logo"
                    width={50}
                    height={50}
                />
            </HeaderLink>
            <HeaderMenuStyle>
                <li>
                    <HeaderLink href={'/'}>News</HeaderLink>
                </li>
                <li>
                    <HeaderLink href={'/categories/sport'}>Sport</HeaderLink>
                </li>
                <li>
                    <HeaderLink href={'/categories/business'}>
                        Business
                    </HeaderLink>
                </li>
                <li>
                    <HeaderLink href={'/categories/technology'}>
                        Technology
                    </HeaderLink>
                </li>
            </HeaderMenuStyle>
        </HeaderStyle>
    )
}

// Styled Components
const HeaderLogo = styled(Image)`
    width: 'auto';
    margin: 0 5px 0 2px;
    aspect-ratio: 1/1;
`
const HeaderLink = styled(Link)`
    color: #e9353b;
    padding: 0 10px;
    margin: 10px 0;
    font-size: 36px;
    text-decoration: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    font-family: 'Noto Serif', serif;
`

const HeaderStyle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
`
const HeaderMenuStyle = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    color: #1f1f1f;
    font-size: 16px;
    padding: 0 5px;

    a {
        text-decoration: none;
        padding: 15px 15px;
        margin: 0;
        height: 100%;
        border-radius: 5px;
        &:hover {
            background: #ccc;
            transition: all 0.1s ease;
        }
    }
`
