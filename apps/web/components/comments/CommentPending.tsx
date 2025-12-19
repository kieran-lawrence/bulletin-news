import styled from 'styled-components'
import { BulletinButtonAlt } from '../../utils/styles/shared'

interface CommentPendingProps {
    setIsVisible: (show: boolean) => void
    isError?: boolean
}

export const CommentPending = ({
    setIsVisible,
    isError,
}: CommentPendingProps) => {
    return (
        <PendingModal $error={isError}>
            <span>
                <h4>{isError ? 'Error :(' : 'Comment submitted!'}</h4>
                <BulletinButtonAlt
                    onClick={() => setIsVisible(false)}
                    $padding="4px 8px"
                    $fontSize="13px"
                >
                    {isError ? 'Close' : 'Dismiss'}
                </BulletinButtonAlt>
            </span>
            <p>
                {isError
                    ? 'There was an error submitting your comment. Please try again later.'
                    : 'Your comment has been created and is pending review by a moderator.'}
            </p>
        </PendingModal>
    )
}
const PendingModal = styled.div<{ $error?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    border: 1px solid ${(props) => (props.$error ? '#e9353b' : '#de6676')};
    background: ${(props) => (props.$error ? '#fff1f0' : 'white')};
    border-radius: 8px;
    padding: 8px 16px;
    margin-bottom: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.17);

    span {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    h4 {
        margin: 0;
        color: ${(props) => (props.$error ? '#e9353b' : '#de6676')};
    }
    p {
        margin: 0;
        color: ${(props) => (props.$error ? '#e9353b' : '#7a7a7a')};
    }
`
