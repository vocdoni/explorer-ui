import LoaderPage from '@components/pages/app/layout/loader-page';
import ProcessDetailPage from '@components/pages/elections/details';
import { ElectionProvider, OrganizationProvider, useElection } from '@vocdoni/react-providers';
import { ensure0x } from '@vocdoni/sdk';
import { useTranslation } from 'react-i18next';
import { useUrlHash } from 'use-url-hash';

const ProcessesDetailPage = () => {
  const {
    loading: { election: loading },
    election,
    errors: { election: error },
    loaded,
  } = useElection();
  const { i18n } = useTranslation();

  const hasError = error?.length > 0;
  const hasContent = !!election;
  const isLoading = loading || !loaded;

  return (
    <LoaderPage
      loading={isLoading}
      error={hasError}
      hasContent={hasContent}
      errorMessage={i18n.t('processes.details.process_not_found')}
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
