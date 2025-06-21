'use client'

import React from 'react'
import Layout from '../../components/layout'
import { ArticlePage } from '../../components/article/ArticlePage'

export default function Article({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const actualParams = React.use(params)
    return (
        <Layout>
            <ArticlePage id={actualParams.id} />
        </Layout>
    )
}
