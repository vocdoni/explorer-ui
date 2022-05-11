import styled from 'styled-components'

/**
 * This file contains styles to create text badges. 
 * 
 * For example, green badge for "Active" or red for "Canceled"
 * **/

const BaseStatusBadge = styled.span`
box-shadow: rgba(180, 193, 228, 0.35) 0px 3px 3px;
border-radius: 10px;
height: 16px;
padding: 4px 12px;
line-height: 16px;
margin: 2px;
font-size: 12px;
font-weight: 500;
color: ${({theme}) => theme.white}
`

const ActiveBadge = styled(BaseStatusBadge)`
background-color: ${({theme}) => theme.accent1C}
`

const UpcomingBadge = styled(BaseStatusBadge)`
background-color: ${({theme}) => theme.accent1B}
`

const EndedBadge = styled(BaseStatusBadge)`
background-color: ${({theme}) => theme.textAccent2}
`

const EndedBadgeLight = styled(BaseStatusBadge)`
background-color: ${({theme}) => theme.textAccent2B}
`

const CanceledBadge = styled(BaseStatusBadge)`
background-color:  ${({theme}) => theme.danger}
`

export { ActiveBadge, UpcomingBadge, EndedBadge, CanceledBadge, EndedBadgeLight }