'use client'

import Layout from '../../components/layout'
import { ArticlePage } from '../../components/ArticlePage'

export default function Article({ params }: { params: { id: string } }) {
    return (
        <Layout>
            <ArticlePage id={params.id} />
        </Layout>
    )
}
