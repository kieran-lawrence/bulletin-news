'use client'

import styled from 'styled-components'
import Layout from '../components/layout'

export default function TermsOfService() {
    return (
        <Layout>
            <TermsOfServicePage>
                <h1>Terms of Service</h1>
                <div>
                    <p>{`Welcome to Bulletin (the "Site"), a news website owned and operated by Bulletin. By accessing and using the Site, you agree to be bound by the following Terms of Service (the "Terms"). Please read these Terms carefully before using the Site.`}</p>
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using the Site, you acknowledge that
                        you have read, understood, and agree to be bound by
                        these Terms. If you do not agree to these Terms, please
                        do not use the Site.
                    </p>
                    <h2>2. Use of the Site</h2>
                    <p>
                        The Site is intended for general informational purposes
                        only. You may use the Site for your personal,
                        non-commercial use. You may not use the Site for any
                        commercial purpose without the prior written consent of
                        Bulletin.
                    </p>
                    <h2>3. Intellectual Property</h2>
                    <p>
                        All content on the Site, including but not limited to
                        text, images, audio, and video, is the property of
                        Bulletin or its licensors. You may not reproduce,
                        distribute, or display any content from the Site without
                        the prior written consent of Bulletin.
                    </p>
                    <h2>4. Commenting on Articles</h2>
                    <p>
                        We encourage you to engage with our content by
                        commenting on articles. However, we reserve the right to
                        moderate and remove any comments that we deem to be:
                    </p>
                    <ul>
                        <li>Abusive, harassing, or threatening</li>
                        <li>Obscene, profane, or indecent</li>
                        <li>Defamatory or libelous</li>
                        <li>Spam or self-promotional</li>
                        <li>Off-topic or irrelevant</li>
                    </ul>
                    <p>By commenting on an article, you agree to:</p>
                    <ul>
                        <li>Be respectful and courteous to other users</li>
                        <li>
                            Not post any personal or confidential information
                        </li>
                        <li>Not impersonate any person or entity</li>
                        <li>
                            Not post any copyrighted material without permission
                        </li>
                    </ul>
                    <p>
                        We reserve the right to ban or block any user who
                        repeatedly violates these commenting guidelines.
                    </p>
                    <h2>5. User-Generated Content</h2>
                    <p>
                        By submitting any user-generated content, including but
                        not limited to comments, photos, or videos, you grant
                        Bulletin a non-exclusive, royalty-free, perpetual, and
                        irrevocable license to use, reproduce, distribute, and
                        display such content.
                    </p>
                    <h2>6. Disclaimer of Warranties</h2>
                    <p>{`The Site is provided on an "as is" and "as available" basis. Bulletin disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.`}</p>
                    <h2>7. Limitation of Liability</h2>
                    <p>
                        In no event shall Bulletin be liable for any damages,
                        including but not limited to incidental, consequential,
                        or punitive damages, arising out of or related to the
                        use of the Site.
                    </p>
                    <h2>8. Changes to Terms</h2>
                    <p>
                        Bulletin reserves the right to modify or update these
                        Terms at any time without notice. Your continued use of
                        the Site following any changes to these Terms shall be
                        deemed to be your acceptance of such changes.
                    </p>
                    <h2>9. Contact Us</h2>
                    <p>
                        If you have any questions or concerns about these Terms,
                        please contact us at{' '}
                        <a href="mailto:support@bulletin.com">
                            support@bulletin.com
                        </a>
                        .
                    </p>
                </div>
            </TermsOfServicePage>
        </Layout>
    )
}
const TermsOfServicePage = styled.div`
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
