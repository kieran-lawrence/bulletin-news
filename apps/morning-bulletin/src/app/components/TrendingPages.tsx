import { Publisher } from '../utils/types'
import { useGetPublishersQuery } from '../utils/store/publisher'
import { SectionWrapperStyle } from '../styles/shared'
import { SectionHeader } from './SectionHeader'
import styled from 'styled-components'
import Image from 'next/image'
import { Loader } from './Loader'

export const TrendingPages = () => {
    const { data: publishers, isLoading } = useGetPublishersQuery({
        page_size: 10,
    })
    return (
        <SectionWrapperStyle>
            <SectionHeader
                headerText="Trending Pages"
                showSeeMoreText
                href="/publishers"
            />
            <TrendingPagesContainer>
                {isLoading && <Loader />}
                {publishers &&
                    publishers.map((publisher: Publisher) => (
                        <StyledPublisherWrapper key={publisher.id}>
                            <StyledPublisherLogoWrapper>
                                <Image
                                    width={65}
                                    height={65}
                                    src={publisher.logoUrl}
                                    alt={publisher.name}
                                />
                            </StyledPublisherLogoWrapper>
                            <p>{publisher.handle}</p>
                        </StyledPublisherWrapper>
                    ))}
            </TrendingPagesContainer>
        </SectionWrapperStyle>
    )
}

const TrendingPagesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    padding: 0 20px;
    gap: 24px;
`
const StyledPublisherWrapper = styled.div`
    text-align: center;
    &:hover {
        cursor: pointer;
    }
    div {
        background-image: linear-gradient(#e9353b, #ff7300);
        width: 68px;
        height: 68px;
        border-radius: 50%;
        display: grid;
        place-items: center;
    }
    p {
        font-size: 10px;
    }
`
const StyledPublisherLogoWrapper = styled.div`
    background-image: linear-gradient(#e9353b, #ff7300);
    width: 68px;
    height: 68px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    img {
        border-radius: 50%;
        width: 95%;
        aspect-ratio: 1/1;
        object-fit: cover;
        box-shadow: 0 0 2px #cccccc80;
    }
`
