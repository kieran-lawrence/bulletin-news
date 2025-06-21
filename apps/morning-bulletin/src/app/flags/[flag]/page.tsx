'use client'

import React from 'react'
import { FlagPage } from '../../components/flags/FlagPage'
import Layout from '../../components/layout'

export default function Flag({
    params,
}: {
    params: Promise<{ flag: string }>
}) {
    const actualParams = React.use(params)
    return (
        <Layout>
            <FlagPage flag={actualParams.flag} />
        </Layout>
    )
}
