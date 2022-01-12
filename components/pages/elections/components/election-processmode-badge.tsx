
import i18n from '@i18n'
import { Switch, Case } from 'react-if'

interface ProcessModeBadgeProps {
    autostart: boolean
}

export const ProcessModeBadge = ({
  autostart,
}: ProcessModeBadgeProps) => {

  return ( 
    <span> 
        {autostart ? i18n.t("elections.autostart") : i18n.t("elections.notAutostart")}</span>
  )
}
