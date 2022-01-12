import styled from 'styled-components'
import { VochainProcessStatus } from 'dvote-js'
import i18n from '@i18n'
import { Switch, Case } from 'react-if'

interface ElectionStatusBadgeProps {
    status: VochainProcessStatus
}

export const ElectionStatusBadge = ({
    status,
}: ElectionStatusBadgeProps) => {

  return (
    <Switch>
    <Case condition={ status == VochainProcessStatus.READY}>
      <ActiveProcessStatusLabel>{i18n.t("elections.ready")}</ActiveProcessStatusLabel>
    </Case>
    <Case condition={ status == VochainProcessStatus.PAUSED}>
      <EndedProcessStatusLabel>{i18n.t("elections.paused")}</EndedProcessStatusLabel>
    </Case>
    <Case condition={ status == VochainProcessStatus.ENDED}>
      <EndedProcessStatusLabel>{i18n.t("elections.ended")}</EndedProcessStatusLabel>
    </Case>
    <Case condition={ status == VochainProcessStatus.CANCELED}>
      <CanceledProcessStatusLabel>{i18n.t("elections.canceled")}</CanceledProcessStatusLabel>
    </Case>
    <Case condition={ status == VochainProcessStatus.RESULTS}>
      <UpcomingStatusLabel>{i18n.t("elections.results")}</UpcomingStatusLabel>
    </Case>
  </Switch>
  )
}

const BaseProcessStatusLabel = styled.span`
  box-shadow: rgba(180, 193, 228, 0.35) 0px 3px 3px;
  border-radius: 10px;
  height: 16px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${({theme}) => theme.white}
`

const ActiveProcessStatusLabel = styled(BaseProcessStatusLabel)`
  background-color: ${({theme}) => theme.accent1C}
`
  
const UpcomingStatusLabel = styled(BaseProcessStatusLabel)`
  background-color: ${({theme}) => theme.accent1B}
`

const EndedProcessStatusLabel = styled(BaseProcessStatusLabel)`
  background-color: ${({theme}) => theme.textAccent2}
`

const CanceledProcessStatusLabel = styled(BaseProcessStatusLabel)`
  background-color:  ${({theme}) => theme.danger}
`

