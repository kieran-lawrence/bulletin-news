'use client'

import { FeaturedArticle } from './components/FeaturedArticle'
import Layout from './components/layout'
import { LatestNews } from './components/LatestNews'
import { TrendingPages } from './components/TrendingPages'
import { MustRead } from './components/MustRead'
import { EditorPick } from './components/EditorsPick'
import { Categories } from './components/Categories'

export default function Index() {
    return (
        <Layout>
            <FeaturedArticle articleId={'1'} />
            <LatestNews />
            <TrendingPages />
            <MustRead />
            <EditorPick />
            <Categories firstCategory="business" secondCategory="sport" />
        </Layout>
    )
}
