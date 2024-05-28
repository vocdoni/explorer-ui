import LoaderPage from '@components/pages/app/layout/loader-page';
import ProcessDetailPage from '@components/pages/elections/details';
import { ElectionProvider, OrganizationProvider, useElection } from '@vocdoni/react-providers';
import { ensure0x } from '@vocdoni/sdk';
import { useTranslation } from 'next-i18next';
import { useUrlHash } from 'use-url-hash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
const ProcessesDetailPage = () => {
  const {
    loading: { election: loading },
    election,
    errors: { election: error },
    loaded,
  } = useElection();
  const { t } = useTranslation();
  const hasError = error?.length > 0;
  const hasContent = !!election;
  const isLoading = loading || !loaded;

  return (
    <LoaderPage
      loading={isLoading}
      error={hasError}
      hasContent={hasContent}
      errorMessage={t('processes.details.process_not_found')}
    >
      <OrganizationProvider id={ensure0x(election?.organizationId ?? '')}>
        <ProcessDetailPage />
      </OrganizationProvider>
    </LoaderPage>
  );
};

const ProcessHome = () => {
  const processId = useUrlHash().slice(1);
  return (
    <ElectionProvider id={processId}>
      <ProcessesDetailPage />
    </ElectionProvider>
  );
};

export default ProcessHome;
