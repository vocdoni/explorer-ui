
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
          ? <ActiveBadge>{i18n.t("elections.enevelope_type_badge.encryptedVotes")}</ActiveBadge> 
          : <EndedBadge>{i18n.t("elections.enevelope_type_badge.notEncryptedVotes")}</EndedBadge>}</>
  )
}
