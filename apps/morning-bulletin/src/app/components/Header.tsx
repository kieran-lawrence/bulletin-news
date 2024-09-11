import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
export const Header = () => {
    return (
        <HeaderContainer>
            <HeaderStyle>
                <HeaderLogoWrap href="/">
                    <h1>Bulletin</h1>
                    <HeaderLogo
                        src="/BulletinLogoSmall.png"
                        alt="Bulletin Logo"
                        width={64}
                        height={64}
                    />
                </HeaderLogoWrap>
                <HeaderMenuStyle>
                    <li>
                        <HeaderLink href={'/'}>News</HeaderLink>
                    </li>
                    <li>
                        <HeaderLink href={'/categories/sport'}>
                            Sport
                        </HeaderLink>
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
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
`
const HeaderLogo = styled(Image)`
    width: 'auto';
    margin: 0 5px 0 2px;
    aspect-ratio: 1/1;
`
const HeaderLogoWrap = styled(Link)`
    color: #e9353b;
    margin: 0;
    display: flex;
    align-items: center;
    text-decoration: none;
    h1 {
        margin: 0;
        font-size: 48px;

        font-weight: 600;
        font-family: 'Noto Serif', serif;
    }
`
const HeaderLink = styled(Link)`
    color: #1f1f1f;
    padding: 0 10px;
    margin: 10px 0;
    font-size: 24px;
    text-decoration: none;
    font-weight: 400;
    display: flex;
    align-items: center;

    &:hover {
        box-shadow: 0 2px 0 #e9353b;
    }
    transition: all 0.2s ease;
`
const HeaderStyle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    width: 65vw;
    gap: 24px;
`
const HeaderMenuStyle = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    color: #1f1f1f;
    font-size: 16px;
    padding: 0 5px;
    margin: 0;
`
