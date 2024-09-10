import { Header } from './Header'
import { Footer } from './Footer'
import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = { children: ReactNode }

export default function Layout({ children }: Props) {
    return (
        <>
            <Header />
            <StyledMainLayout>{children}</StyledMainLayout>
            <Footer />
        </>
    )
}

const StyledMainLayout = styled.main`
    margin: 16px 64px;
`
