import { EnvelopeDetails } from '@components/pages/envelopes/details';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'react-i18next';
import { useVoteInfo } from '@hooks/use-voconi-sdk';
import LoaderPage from '@components/pages/app/layout/loader-page';
import React from 'react';

const EnvelopeDetailPage = () => {
  const { i18n } = useTranslation();
  const voteId: string = useUrlHash().slice(1);
  const {
    loading,
    data: envelope,
    error,
    loaded,
  } = useVoteInfo({
    voteId,
  });
  const isLoading = loading || !loaded;

  return (
    <LoaderPage
      loading={isLoading}
      error={!!error}
      hasContent={!!envelope}
      errorMessage={i18n.t('envelopes.details.envelope_not_found')}
    >
      <EnvelopeDetails envelope={envelope} />
    </LoaderPage>
  );
};

export default EnvelopeDetailPage;
