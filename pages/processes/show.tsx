import ProcessDetailPage from '@components/pages/processes/details';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'react-i18next';
import { ElectionProvider, OrganizationProvider, useElection } from '@vocdoni/chakra-components';
import { ensure0x } from '@vocdoni/sdk';
import LoaderPage from '@components/pages/app/layout/loader-page';

const ProcessesDetailPage = () => {
  const { loading, election, error } = useElection(); // todo(kon): when suported by chakra-components, add loaded
  const { i18n } = useTranslation();

  const hasError = error?.length > 0;
  const hasContent = !!election;

  return (
    <LoaderPage
      loading={loading}
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
