'use client'

import { useEffect } from 'react'
import styled from 'styled-components'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <ErrorPage>
            <h1>Oh no, Something went wrong!</h1>
            <button onClick={() => reset()}>Try again</button>
        </ErrorPage>
    )
}
const ErrorPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    gap: 24px;

    h1 {
        font-family: 'Noto Serif', serif;
    }
    button {
        border: none;
        background-color: #e50914;
        color: #fff;
        border-radius: 5px;
        padding: 10px;
        &:hover {
            cursor: pointer;
        }
    }
`
