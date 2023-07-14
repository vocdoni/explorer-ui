import { useTranslation } from 'react-i18next';
import { BaseStatusBadge } from '@components/elements/card-badge';

interface EnvelopeTypeBadgeProps {
  encryptedVotes: boolean;
}

export const ElectionTypeBadge = ({ encryptedVotes }: EnvelopeTypeBadgeProps) => {
  const { i18n } = useTranslation();

  return (
    <>
      {encryptedVotes ? (
        <BaseStatusBadge>{i18n.t('processes.envelope_type_badge.encrypted_votes')}</BaseStatusBadge>
      ) : (
        <BaseStatusBadge>{i18n.t('processes.envelope_type_badge.not_encrypted_votes')}</BaseStatusBadge>
      )}
    </>
  );
};
