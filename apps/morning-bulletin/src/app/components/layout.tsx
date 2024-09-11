import { Header } from './Header'
import { Footer } from './Footer'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { store } from '../utils/store'

type Props = { children: ReactNode; contentWidth?: string }

export default function Layout({ children, contentWidth }: Props) {
    return (
        <Provider store={store}>
            <StyledPage>
                <StyledContentWrapper $width={contentWidth}>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </StyledContentWrapper>
            </StyledPage>
        </Provider>
    )
}

const StyledContentWrapper = styled.div<{
    $width?: string
}>`
    width: ${(props) => props.$width || '65vw'};
`
const StyledPage = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`
