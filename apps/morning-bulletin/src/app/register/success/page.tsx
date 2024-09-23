'use client'

import styled from 'styled-components'
import Layout from '../../components/layout'
import { BulletinLinkButton } from '../../styles/shared'

export default function RegisterSuccess() {
    return (
        <Layout>
            <RegisterSuccessWrapper>
                <h1>Thank you for joining Bulletin! </h1>
                <p>
                    We&apos;re excited to have you as part of our community.
                    Stay tuned for the latest news, updates, and insights from
                    our team. You can start exploring our website now and
                    customize your news feed to get the most relevant content.
                    We appreciate your interest in Bulletin and look forward to
                    providing you with high-quality news and information. Happy
                    reading!
                </p>
                <BulletinLinkButton href={'/login'}>Login</BulletinLinkButton>
            </RegisterSuccessWrapper>
        </Layout>
    )
}
const RegisterSuccessWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    flex-direction: column;
    gap: 24px;

    h1 {
        width: 50%;
    }
    p {
        width: 50%;
    }
`
