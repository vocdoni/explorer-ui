import { VochainProcessStatus } from 'dvote-js'
import { useTranslation } from 'react-i18next'
import { Switch, Case } from 'react-if'
import { ActiveBadge, UpcomingBadge, EndedBadge, CanceledBadge } from '@components/elements/text-badge'

interface ProcessStatusBadgeProps {
    status: VochainProcessStatus
}

export const ProcessStatusBadge = ({
    status,
}: ProcessStatusBadgeProps) => {
  const { i18n } = useTranslation()
  return (
    <Switch>
    <Case condition={ status == VochainProcessStatus.READY}>
      <ActiveBadge>{i18n.t("processes.status_badge.ready")}</ActiveBadge>
    </Case>
    <Case condition={ status == VochainProcessStatus.PAUSED}>
      <EndedBadge>{i18n.t("processes.status_badge.paused")}</EndedBadge>
    </Case>
    <Case condition={ status == VochainProcessStatus.ENDED}>
      <EndedBadge>{i18n.t("processes.status_badge.ended")}</EndedBadge>
    </Case>
    <Case condition={ status == VochainProcessStatus.CANCELED}>
      <CanceledBadge>{i18n.t("processes.status_badge.canceled")}</CanceledBadge>
    </Case>
    <Case condition={ status == VochainProcessStatus.RESULTS}>
      <UpcomingBadge>{i18n.t("processes.status_badge.results")}</UpcomingBadge>
    </Case>
  </Switch>
  )
}
