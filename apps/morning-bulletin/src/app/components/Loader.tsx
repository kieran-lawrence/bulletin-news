import styled from 'styled-components'

export const Loader = () => {
    return (
        <LoaderWrapper>
            <StyledLoader
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    className="firstSquare"
                    x="1"
                    y="1"
                    rx="1"
                    width="10"
                    height="10"
                />
                <rect
                    className="firstSquare secondSquare"
                    x="1"
                    y="1"
                    rx="1"
                    width="10"
                    height="10"
                />
                <rect
                    className="firstSquare thirdSquare"
                    x="1"
                    y="1"
                    rx="1"
                    width="10"
                    height="10"
                />
            </StyledLoader>
        </LoaderWrapper>
    )
}
const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vw;
    height: 20vh;
`
const StyledLoader = styled.svg`
    width: 36px;
    height: 36px;
    rect {
        &:nth-of-type(1) {
            fill: #da3d4d;
        }
        &:nth-of-type(2) {
            fill: #de6676;
        }
        &:nth-of-type(3) {
            fill: #e795a2;
        }
    }
    .firstSquare {
        animation: rotateMe 2.4s linear infinite;
        animation-delay: -2.4s;
    }
    .secondSquare {
        animation-delay: -1.6s;
    }
    .thirdSquare {
        animation-delay: -0.8s;
    }
    @keyframes rotateMe {
        8.33% {
            x: 13px;
            y: 1px;
        }
        25% {
            x: 13px;
            y: 1px;
        }
        33.3% {
            x: 13px;
            y: 13px;
        }
        50% {
            x: 13px;
            y: 13px;
        }
        58.33% {
            x: 1px;
            y: 13px;
        }
        75% {
            x: 1px;
            y: 13px;
        }
        83.33% {
            x: 1px;
            y: 1px;
        }
    }
`
