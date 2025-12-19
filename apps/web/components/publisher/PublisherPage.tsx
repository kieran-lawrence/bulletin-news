'use client'

import styled from 'styled-components'
import { useGetPublishersQuery } from '../../utils/store/publisher'
import { Loader } from '../Loader'
import { BiLogoInstagram } from 'react-icons/bi'
import Link from 'next/link'

export const PublisherPage = () => {
    const { data, isLoading } = useGetPublishersQuery({
        page_size: 9,
    })
    return (
        <PublisherPageWrapper>
            {isLoading && <Loader />}
            <h1>Publishers</h1>
            <div className="publishersGrid">
                {data &&
                    data.map((publisher) => (
                        <PublisherWrapper>
                            <PublisherImageWrapper>
                                <img
                                    src={publisher.logoUrl}
                                    alt={publisher.name}
                                    className="pubLogo"
                                />
                            </PublisherImageWrapper>
                            <h2>{publisher.name}</h2>
                            <p>{publisher.description}</p>
                            <Link
                                href={`https://instagram.com/${publisher.handle}`}
                                target="_blank"
                            >
                                Visit them on Instagram{' '}
                                <BiLogoInstagram size={24} />{' '}
                            </Link>
                        </PublisherWrapper>
                    ))}
            </div>
        </PublisherPageWrapper>
    )
}
const PublisherPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    padding: 24px 0;

    h1 {
        text-transform: capitalize;
        font-size: 26px;
        font-weight: 600;
    }

    .publishersGrid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 16px;
    }
`
const PublisherWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    padding: 5px;
    border-radius: 5px;
    background: #f5f5f5;

    p {
        flex: 1;
        text-align: justify;
        color: #353535;
    }
    a {
        color: #e9353b;
        text-decoration: none;
        display: flex;
        align-items: center;
        &:hover {
            color: #c72a30;
        }
    }
`
const PublisherImageWrapper = styled.div`
    background-image: linear-gradient(#e9353b, #ff7300);
    width: 68px;
    height: 68px;
    border-radius: 50%;
    display: grid;
    place-items: center;

    .pubLogo {
        width: 95%;
        aspect-ratio: 1/1;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 0 2px #cccccc80;
        overflow: hidden;
    }
`
