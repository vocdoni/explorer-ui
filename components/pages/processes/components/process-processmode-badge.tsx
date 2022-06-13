
import { useTranslation } from 'react-i18next'
import { UpcomingBadge } from '@components/elements/text-badge'


interface ProcessModeBadgeProps {
    autostart: boolean
}

export const ProcessModeBadge = ({
  autostart,
}: ProcessModeBadgeProps) => {
  const { i18n } = useTranslation()

  return ( 
    <UpcomingBadge> 
        {autostart ? i18n.t("processes.process_mode_badge.autostart") : i18n.t("processes.process_mode_badge.notAutostart")}</UpcomingBadge>
  )
}
