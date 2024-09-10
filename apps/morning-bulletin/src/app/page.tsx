'use client'

import { Provider } from 'react-redux'
import { FeaturedArticle } from './components/FeaturedArticle'
import Layout from './components/layout'
import { store } from './utils/store'
import { LatestNews } from './components/LatestNews'
import { TrendingPages } from './components/TrendingPages'
import { MustRead } from './components/MustRead'
import { EditorPick } from './components/EditorsPick'
import { Categories } from './components/Categories'

export default function Index() {
    return (
        <Provider store={store}>
            <Layout>
                <FeaturedArticle articleId={'1'} />
                <LatestNews />
                <TrendingPages />
                <MustRead />
                <EditorPick />
                <Categories firstCategory="business" secondCategory="sport" />
            </Layout>
        </Provider>
    )
}
