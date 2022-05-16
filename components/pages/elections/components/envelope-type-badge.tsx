
import { EndedBadge, ActiveBadge } from '@components/elements/text-badge'
import { useTranslation } from 'react-i18next'

interface EnvelopeTypeBadgeProps {
    encryptedVotes: boolean;
}

export const EnvelopeTypeBadge = ({
    encryptedVotes,
}: EnvelopeTypeBadgeProps) => {
  const { i18n } = useTranslation()

  return ( <>
        {encryptedVotes
          ? <ActiveBadge>{i18n.t("elections.envelope_type_badge.encrypted_votes")}</ActiveBadge> 
          : <EndedBadge>{i18n.t("elections.envelope_type_badge.not_encrypted_votes")}</EndedBadge>}</>
  )
}
