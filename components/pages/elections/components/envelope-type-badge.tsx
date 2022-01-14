
import { EndedBadge, ActiveBadge } from '@components/elements/text-badge'
import i18n from '@i18n'

interface EnvelopeTypeBadgeProps {
    encryptedVotes: boolean;
}

export const EnvelopeTypeBadge = ({
    encryptedVotes,
}: EnvelopeTypeBadgeProps) => {

  return ( <>
        {encryptedVotes 
          ? <ActiveBadge>{i18n.t("elections.encryptedVotes")}</ActiveBadge> 
          : <EndedBadge>{i18n.t("elections.notEncryptedVotes")}</EndedBadge>}</>
  )
}
