
import { EndedBadge, ActiveBadge } from '@components/elements/text-badge'
import { useTranslation } from 'react-i18next'
import { UpcomingVoteBadge } from '@components/blocks/badges/process-status-badge'

interface EnvelopeTypeBadgeProps {
    encryptedVotes: boolean;
}

export const EnvelopeTypeBadge = ({
    encryptedVotes,
}: EnvelopeTypeBadgeProps) => {
  const { i18n } = useTranslation()

  return ( <>
        {encryptedVotes
          ? <ActiveBadge>{i18n.t("processes.envelope_type_badge.encrypted_votes")}</ActiveBadge>
          : <UpcomingVoteBadge>{i18n.t("processes.envelope_type_badge.not_encrypted_votes")}</UpcomingVoteBadge>}</>
  )
}
