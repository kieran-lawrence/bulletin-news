'use client'

import styled from 'styled-components'
import Layout from '../components/layout'

export default function TermsOfService() {
    return (
        <Layout>
            <PrivacyPolicyPage>
                <h1>Privacy Policy</h1>
                <p>Last updated: 19th September 2024</p>
                <div>
                    <h2>Introduction</h2>
                    <p>{`Welcome to Bulletin, a news company that provides up-to-date news and information to our users. This Privacy Policy describes how we collect, use, and disclose information when you use our website, mobile application, or other services ("Services").`}</p>
                    <h2>Information We Collect</h2>
                    <h3>Information You Provide</h3>
                    <p>
                        We collect information you provide to us when you use
                        our Services, such as when you create an account,
                        subscribe to our newsletter, or fill out a form. This
                        information may include your name, email address, phone
                        number, and other personal details.
                    </p>

                    <h3>Automatically Collected Information</h3>
                    <p>
                        We also collect information automatically when you use
                        our Services, such as your IP address, device
                        information, and browsing behavior. This information
                        helps us improve our Services and provide a better user
                        experience.
                    </p>

                    <h3>Cookies and Similar Technologies</h3>
                    <p>
                        We use cookies and similar technologies to collect
                        information about your browsing behavior and
                        preferences. This information helps us personalize your
                        experience and improve our Services.
                    </p>

                    <h2>How We Use Your Information</h2>
                    <p>
                        We use your information to provide and improve our
                        Services, including to:
                    </p>
                    <ul>
                        <li>
                            Provide you with personalized content and
                            recommendations;
                        </li>
                        <li>Improve our Services and user experience;</li>
                        <li>
                            Communicate with you about our Services and news;
                        </li>
                        <li>Provide customer support;</li>
                        <li>Enforce our terms of service;</li>
                        <li>Prevent fraud and abuse;</li>
                        <li>Comply with legal obligations.</li>
                    </ul>

                    <h2>Sharing Your Information</h2>
                    <p>
                        We may share your information with third parties in
                        certain circumstances, such as:
                    </p>
                    <ul>
                        <li>With your consent or at your direction;</li>
                        <li>
                            With service providers who help us operate our
                            Services;
                        </li>
                        <li>
                            To comply with legal obligations or protect our
                            rights and interests;
                        </li>
                        <li>
                            To enforce our terms of service or prevent fraud and
                            abuse.
                        </li>
                    </ul>

                    <h2>Security</h2>
                    <p>
                        We take the security of your information seriously. We
                        use industry-standard security measures to protect your
                        information from unauthorized access, use, or
                        disclosure. However, no method of transmission over the
                        internet, or method of electronic storage, is 100%
                        secure. Therefore, we cannot guarantee the absolute
                        security of your information.
                    </p>

                    <h2>Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We
                        will notify you of any changes by posting the new
                        Privacy Policy on this page. Your continued use of our
                        Services after the changes become effective constitutes
                        your acceptance of the revised Privacy Policy.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or concerns about these Terms,
                        please contact us at{' '}
                        <a href="mailto:support@bulletin.com">
                            support@bulletin.com
                        </a>
                        .
                    </p>
                </div>
            </PrivacyPolicyPage>
        </Layout>
    )
}
const PrivacyPolicyPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 0;

    flex-direction: column;

    h1 {
        margin-bottom: 8px;
    }
    div {
        width: 65vw;

        h2 {
            margin-top: 16px;
        }
    }
`
