import { VochainProcessStatus } from 'dvote-js'
import i18n from '@i18n'
import { Switch, Case } from 'react-if'
import { ActiveBadge, UpcomingBadge, EndedBadge, CanceledBadge } from '@components/elements/text-badge'

interface ElectionStatusBadgeProps {
    status: VochainProcessStatus
}

export const ElectionStatusBadge = ({
    status,
}: ElectionStatusBadgeProps) => {

  return (
    <Switch>
    <Case condition={ status == VochainProcessStatus.READY}>
      <ActiveBadge>{i18n.t("elections.ready")}</ActiveBadge>
    </Case>
    <Case condition={ status == VochainProcessStatus.PAUSED}>
      <EndedBadge>{i18n.t("elections.paused")}</EndedBadge>
    </Case>
    <Case condition={ status == VochainProcessStatus.ENDED}>
      <EndedBadge>{i18n.t("elections.ended")}</EndedBadge>
    </Case>
    <Case condition={ status == VochainProcessStatus.CANCELED}>
      <CanceledBadge>{i18n.t("elections.canceled")}</CanceledBadge>
    </Case>
    <Case condition={ status == VochainProcessStatus.RESULTS}>
      <UpcomingBadge>{i18n.t("elections.results")}</UpcomingBadge>
    </Case>
  </Switch>
  )
}
