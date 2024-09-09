import styled from 'styled-components'
import { formatDate } from '../utils/helpers'
import Image from 'next/image'

type Props = {
    publisherName: string
    datePublished: string
    publisherLogoUrl?: string
    fontColor?: string
    fontSize?: string
    fontWeight?: number
    padding?: string
}

export const PublisherNameAndDate = ({
    publisherName,
    datePublished,
    publisherLogoUrl,
    fontSize,
    fontWeight,
    fontColor,
    padding,
}: Props) => {
    return (
        <PublisherNameWrapper
            $fontSize={fontSize}
            $fontWeight={fontWeight}
            $fontColor={fontColor}
            $padding={padding}
        >
            <Image
                className="pubImage"
                src={publisherLogoUrl || 'Publishers Logo'}
                alt={publisherName || 'Publishers Name'}
                width={12}
                height={12}
            />
            {publisherName} • {formatDate(datePublished)}
        </PublisherNameWrapper>
    )
}

const PublisherNameWrapper = styled.small<{
    $fontSize?: string
    $fontWeight?: number
    $fontColor?: string
    $padding?: string
}>`
    font-size: ${(props) => props.$fontSize || '12px'};
    font-weight: ${(props) => props.$fontWeight || 400};
    color: ${(props) => props.$fontColor || '#3c3c3c'};
    display: flex;
    align-items: center;
    padding: ${(props) => props.$padding || 0};

    .pubImage {
        border-radius: 50%;
        margin: 0 4px;
    }
`
