import { EnvelopeDetails } from '@components/pages/envelopes/details';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'next-i18next';
import { useVoteInfo } from '@hooks/use-voconi-sdk';
import LoaderPage from '@components/pages/app/layout/loader-page';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
const EnvelopeDetailPage = () => {
  const { t } = useTranslation();
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
      errorMessage={t('envelopes.details.envelope_not_found')}
    >
      <EnvelopeDetails envelope={envelope} />
    </LoaderPage>
  );
};

export default EnvelopeDetailPage;
