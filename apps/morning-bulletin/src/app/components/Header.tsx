import styled from 'styled-components'
import Link from 'next/link'
import { HeaderLogo } from './HeaderLogo'
import { useAuth } from '../contexts/AuthContext'
import { FaRegUserCircle } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { BulletinLinkButton, BulletinButtonAlt } from '../styles/shared'
import { useState } from 'react'
import { invalidateCookie } from '../utils/helpers'

export const Header = () => {
    const { user } = useAuth()
    const [showAccountMenu, setShowAccountMenu] = useState(false)

    const handleLogout = () => {
        setShowAccountMenu(false)
        // "logout"
        invalidateCookie('TOKEN')
        window.location.reload()
    }
    return (
        <HeaderContainer>
            <HeaderStyle>
                <HeaderLogo />
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
            <AccountManagement>
                {user ? (
                    <IconContext.Provider value={{ className: 'accountIcon' }}>
                        {showAccountMenu && (
                            <AccountMenu>
                                <li>
                                    <BulletinLinkButton
                                        href="/account"
                                        $padding="6px 12px"
                                    >
                                        Account
                                    </BulletinLinkButton>
                                </li>
                                <li>
                                    <BulletinButtonAlt
                                        onClick={handleLogout}
                                        $padding="6px 12px"
                                    >
                                        Logout
                                    </BulletinButtonAlt>
                                </li>
                            </AccountMenu>
                        )}
                        <FaRegUserCircle
                            onClick={() => setShowAccountMenu(!showAccountMenu)}
                        />
                    </IconContext.Provider>
                ) : (
                    <BulletinLinkButton href={'/login'}>
                        Log In
                    </BulletinLinkButton>
                )}
            </AccountManagement>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 50vw;
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
const AccountManagement = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #1f1f1f;
    font-size: 17px;
    padding: 0 5px;
    margin: 0;
    width: 15vw;
    gap: 16px;
    position: relative;

    .accountIcon {
        width: 28px;
        height: 28px;
        fill: #de6676;
        cursor: pointer;
        &:hover {
            fill: #e9353b;
        }
    }
`
const AccountMenu = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 10px;
    border-radius: 8px;
`
