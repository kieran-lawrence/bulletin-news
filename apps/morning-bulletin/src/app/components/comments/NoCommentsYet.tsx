import styled from 'styled-components'
import { useAuth } from '../../contexts/AuthContext'
import Link from 'next/link'
import { BulletinLinkButton } from '../../styles/shared'

export const NoCommentsYet = () => {
    const user = useAuth()
    return (
        <StyledNoCommentsYet>
            <h3>Start the discussion! </h3>
            We&apos;re eager to hear your thoughts on this article.
            <StyledRegisterCTA>
                {user
                    ? `Leave a comment below and let's get the conversation started.`
                    : 'Only registered users can leave comments.'}
                {!user && (
                    <StyledLinkActions>
                        <BulletinLinkButton href="/login">
                            Sign In
                        </BulletinLinkButton>
                        <p>
                            Don&apos;t have an account?{' '}
                            <Link href="/register">Register</Link>
                        </p>
                    </StyledLinkActions>
                )}
            </StyledRegisterCTA>
        </StyledNoCommentsYet>
    )
}
const StyledNoCommentsYet = styled.div`
    padding: 16px 0;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    h3 {
        font-size: 18px;
    }
`
const StyledRegisterCTA = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledLinkActions = styled.div`
    display: flex;
    padding-top: 16px;
    gap: 16px;
    align-items: center;
    p {
        font-size: 16px;
        a {
            color: #e50914;
        }
    }
`
