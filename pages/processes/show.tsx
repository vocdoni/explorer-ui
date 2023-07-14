import ProcessDetailPage from '@components/pages/elections/details';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'react-i18next';
import { ElectionProvider, OrganizationProvider, useElection } from '@vocdoni/chakra-components';
import { ensure0x } from '@vocdoni/sdk';
import LoaderPage from '@components/pages/app/layout/loader-page';

const ProcessesDetailPage = () => {
  const { loading, election, error, loaded } = useElection();
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
