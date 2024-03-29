import { useTranslation } from 'react-i18next';
import { CustomTag } from '@components/elements/CustomTag';
import React from 'react';

interface EnvelopeTypeBadgeProps {
  encryptedVotes: boolean;
}

export const ElectionTypeBadge = ({ encryptedVotes }: EnvelopeTypeBadgeProps) => {
  const { i18n } = useTranslation();

  return (
    <>
      {encryptedVotes ? (
        <CustomTag>{i18n.t('processes.envelope_type_badge.encrypted_votes')}</CustomTag>
      ) : (
        <CustomTag>{i18n.t('processes.envelope_type_badge.not_encrypted_votes')}</CustomTag>
      )}
    </>
  );
};

export const AnonVoteBadge = () => {
  const { i18n } = useTranslation();
  return (
    <CustomTag bg={'#2e6864'} color={'#c9eaf8'}>
      {i18n.t('vote.badge.anonymous')}
    </CustomTag>
  );
};

export const ArchivedBadge = () => {
  const { i18n } = useTranslation();
  return <CustomTag bg={'#68672e'}>{i18n.t('vote.badge.archived')}</CustomTag>;
};

export const InvalidElectionBadge = () => {
  const { i18n } = useTranslation();
  return (
    <CustomTag bg={'#c9eaf8'} color={'#f17c7c'}>
      {i18n.t('vote.badge.invalid')}
    </CustomTag>
  );
};
