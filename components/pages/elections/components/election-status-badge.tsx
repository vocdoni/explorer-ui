
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
      {i18n.t("elections.ready")}
    </Case>
    <Case condition={ status == VochainProcessStatus.PAUSED}>
      {i18n.t("elections.paused")}
    </Case>
    <Case condition={ status == VochainProcessStatus.ENDED}>
      {i18n.t("elections.ended")}
    </Case>
    <Case condition={ status == VochainProcessStatus.CANCELED}>
      {i18n.t("elections.canceled")}
    </Case>
    <Case condition={ status == VochainProcessStatus.RESULTS}>
      {i18n.t("elections.results")}
    </Case>
  </Switch>
  )
}
