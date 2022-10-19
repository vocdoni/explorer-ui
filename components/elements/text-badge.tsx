import styled from 'styled-components'
import { BaseStatusBadge } from '@components/elements/card-badge'


const ActiveBadge = styled(BaseStatusBadge)`
    background-color: ${({theme}) => theme.accent1C};
    color: ${(props) => props.theme.text};
`

const UpcomingBadge = styled(BaseStatusBadge)`
background-color: ${({theme}) => theme.accent1B};
color: ${(props) => props.theme.text};

`

const EndedBadge = styled(BaseStatusBadge)`
background-color: ${({theme}) => theme.textAccent2};
color: ${(props) => props.theme.text};
`

const EndedBadgeLight = styled(BaseStatusBadge)`
background-color: ${({theme}) => theme.textAccent2B};
color: ${(props) => props.theme.text};
`

const CanceledBadge = styled(BaseStatusBadge)`
background-color:  ${({theme}) => theme.danger};
color: ${(props) => props.theme.text};

`

export { ActiveBadge, UpcomingBadge, EndedBadge, CanceledBadge, EndedBadgeLight }