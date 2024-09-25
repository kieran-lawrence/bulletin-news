'use client'

import { FlagPage } from '../../components/flags/FlagPage'
import Layout from '../../components/layout'

export default function Flag({ params }: { params: { flag: string } }) {
    return (
        <Layout>
            <FlagPage flag={params.flag} />
        </Layout>
    )
}
