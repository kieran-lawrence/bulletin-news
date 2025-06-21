'use client'

import React from 'react'
import { CategoriesPage } from '../../components/categories/CategoriesPage'
import Layout from '../../components/layout'

export default function Category({
    params,
}: {
    params: Promise<{ category: string }>
}) {
    const actualParams = React.use(params)
    return (
        <Layout>
            <CategoriesPage category={actualParams.category} />
        </Layout>
    )
}
