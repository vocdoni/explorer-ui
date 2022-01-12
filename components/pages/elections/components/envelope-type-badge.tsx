
import i18n from '@i18n'

interface EnvelopeTypeBadgeProps {
    encryptedVotes: boolean;
}

export const EnvelopeTypeBadge = ({
    encryptedVotes,
}: EnvelopeTypeBadgeProps) => {

  return ( 
    <span> 
        {encryptedVotes ? i18n.t("elections.encryptedVotes") : i18n.t("elections.notEncryptedVotes")}</span>
  )
}
