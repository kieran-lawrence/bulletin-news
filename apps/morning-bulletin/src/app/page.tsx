'use client'

import { Provider } from 'react-redux'
import { FeaturedArticle } from './components/FeaturedArticle'
import Layout from './components/layout'
import { store } from './utils/store'
import { LatestNews } from './components/LatestNews'

export default function Index() {
    return (
        <Provider store={store}>
            <Layout>
                <FeaturedArticle articleId={'1'} />
                <LatestNews />
            </Layout>
        </Provider>
    )
}
