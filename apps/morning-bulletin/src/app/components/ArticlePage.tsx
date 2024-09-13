import { format } from 'date-fns'
import {
    useGetArticleByIdQuery,
    useGetArticlesByFlagQuery,
} from '../utils/store/article'
import { formatArticleSections } from '../utils/helpers'
import styled from 'styled-components'
import { MdBookmarkAdd } from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import { IconContext } from 'react-icons'
import Link from 'next/link'
import Image from 'next/image'
import { Loader } from './Loader'
import { NumberedAside } from './NumberedAside'

type ArticleProps = {
    id: string
}

export const ArticlePage = ({ id }: ArticleProps) => {
    const { data: article, isLoading: articlesLoading } =
        useGetArticleByIdQuery(id)
    const { data: trendingArticles, isLoading: trendingArticlesLoading } =
        useGetArticlesByFlagQuery({ flag: 'trending', page_size: 4 })

    const isLoading = trendingArticlesLoading || articlesLoading
    return (
        <StyledArticleContainer>
            {isLoading && <Loader />}
            {article && (
                <>
                    <StyledHeroImage src={article.urlToImage} />
                    <ArticleTitleContainer>
                        <ArticleTitle>{article.title}</ArticleTitle>
                        <ArticleActions>
                            <IconContext.Provider
                                value={{ className: 'articleActionIcons' }}
                            >
                                <MdBookmarkAdd />
                                <BsThreeDots />
                            </IconContext.Provider>
                        </ArticleActions>
                    </ArticleTitleContainer>
                    <ArticleBylineContainer>
                        <ArticleByLine>
                            <Image
                                className="articlePublisherLogo"
                                src={article.publisher.logoUrl}
                                alt={article.publisher.name}
                                width={28}
                                height={28}
                            />
                            {article.publisher.name} by {article.author} •{' '}
                            {format(
                                new Date(article.publishedAt),
                                'iii d MMMM, yyyy',
                            )}
                            <Link
                                href={`/categories/${article.category}`}
                                className="articleCategoryLink"
                            >
                                {article.category}
                            </Link>
                            • {article.readTime} min read
                        </ArticleByLine>
                    </ArticleBylineContainer>
                    <StyledArticleContent>
                        <StyledArticle>
                            {article &&
                                article.articleSections &&
                                article.articleSections.map((section, index) =>
                                    formatArticleSections(section, index),
                                )}
                        </StyledArticle>
                        {trendingArticles && (
                            <NumberedAside
                                articles={trendingArticles}
                                heading="Trending Posts"
                            />
                        )}
                    </StyledArticleContent>
                </>
            )}
        </StyledArticleContainer>
    )
}
const StyledArticleContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
`
const StyledArticleContent = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 48px;
    gap: 3vw;
    box-sizing: border-box;
`
const StyledHeroImage = styled.img`
    object-fit: contain;
    margin-bottom: 24px;
`
const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 42vw;
    box-sizing: border-box;
    color: #363636;
    small {
        margin-left: 16px;
        padding: 6px 12px;
        background-color: #f5f5f5;
        border-radius: 5px;
        width: fit-content;
    }
`
const ArticleTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 3vw;
    box-sizing: border-box;
`
const ArticleActions = styled.div`
    width: 5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    .articleActionIcons {
        width: 28px;
        height: 28px;
        fill: #1f1f1f;
        &:hover {
            cursor: pointer;
            fill: #e9353b;
        }
        transition: all 0.1s;
    }
`
const ArticleTitle = styled.h1`
    font-family: 'Noto Serif', serif;
    margin: 0;
    font-size: 42px;
    text-align: left;
    width: 52vw;
`
const ArticleBylineContainer = styled.address`
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    margin: 6px 0 36px 0;
    font-style: normal;
`
const ArticleByLine = styled.div`
    color: #363636;
    width: 60vw;
    display: flex;
    align-items: center;
    gap: 8px;

    .articleCategoryLink {
        text-transform: capitalize;
        text-decoration: none;
        color: #e9353b;
        margin-left: 28px;
    }
`
