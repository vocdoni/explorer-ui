
import i18n from '@i18n'
import { UpcomingBadge } from '@components/elements/text-badge'


interface ProcessModeBadgeProps {
    autostart: boolean
}

export const ProcessModeBadge = ({
  autostart,
}: ProcessModeBadgeProps) => {

  return ( 
    <UpcomingBadge> 
        {autostart ? i18n.t("elections.autostart") : i18n.t("elections.notAutostart")}</UpcomingBadge>
  )
}
