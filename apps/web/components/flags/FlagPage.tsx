import styled from 'styled-components'
import { MustRead } from '../MustRead'
import { EditorPick } from '../EditorsPick'

export const FlagPage = ({ flag }: { flag: string }) => {
    return (
        <FlagPageWrapper>
            <h1>
                Articles flagged with: <i>{flag}</i>
            </h1>
            <EditorPick showHeader={false} flag={flag} page={2} />
            <MustRead showHeader={false} flag={flag} />
        </FlagPageWrapper>
    )
}
const FlagPageWrapper = styled.div`
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
`
