import styled from 'styled-components'
import { BulletinButtonAlt } from '../../styles/shared'

export const CommentPending = ({
    setIsVisible,
}: {
    setIsVisible: (show: boolean) => void
}) => {
    return (
        <PendingModal>
            <span>
                <h4>Comment submitted!</h4>
                <BulletinButtonAlt
                    onClick={() => setIsVisible(false)}
                    $padding="4px 8px"
                    $fontSize="13px"
                >
                    Dismiss
                </BulletinButtonAlt>
            </span>
            <p>
                Your comment has been created and is pending review by a
                moderator.
            </p>
        </PendingModal>
    )
}
const PendingModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    border: 1px solid #de6676;
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
    h4,
    p {
        margin: 0;
    }
`
