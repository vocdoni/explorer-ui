import { useTranslation } from 'next-i18next';
import { CustomTag } from '@components/elements/CustomTag';
import React from 'react';

interface EnvelopeTypeBadgeProps {
  encryptedVotes: boolean;
}

export const ElectionTypeBadge = ({ encryptedVotes }: EnvelopeTypeBadgeProps) => {
  const { t } = useTranslation();
  return (
    <>
      {encryptedVotes ? (
        <CustomTag>{t('processes.envelope_type_badge.encrypted_votes')}</CustomTag>
      ) : (
        <CustomTag>{t('processes.envelope_type_badge.not_encrypted_votes')}</CustomTag>
      )}
    </>
  );
};

export const AnonVoteBadge = () => {
  const { t } = useTranslation();
  return (
    <CustomTag bg={'#2e6864'} color={'#c9eaf8'}>
      {t('vote.badge.anonymous')}
    </CustomTag>
  );
};

export const ArchivedBadge = () => {
  const { t } = useTranslation();
  return <CustomTag bg={'#68672e'}>{t('vote.badge.archived')}</CustomTag>;
};

export const InvalidElectionBadge = () => {
  const { t } = useTranslation();
  return (
    <CustomTag bg={'#c9eaf8'} color={'#f17c7c'}>
      {t('vote.badge.invalid')}
    </CustomTag>
  );
};
