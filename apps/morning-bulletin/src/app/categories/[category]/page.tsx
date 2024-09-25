'use client'

import { CategoriesPage } from '../../components/categories/CategoriesPage'
import Layout from '../../components/layout'

export default function Category({ params }: { params: { category: string } }) {
    return (
        <Layout>
            <CategoriesPage category={params.category} />
        </Layout>
    )
}
