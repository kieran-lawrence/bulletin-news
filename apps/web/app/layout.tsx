import type { Metadata } from 'next'
import './globals.css'
import { StyledComponentsRegistry } from './registry'

export const metadata: Metadata = {
    title: 'Bulletin News | Local, National and International News',
    description:
        'Get your daily dose of news, coming at you from around the globe, as it happens!',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </body>
        </html>
    )
}
