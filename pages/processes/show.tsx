import { Loader } from '@components/blocks/loader';
import ProcessDetailPage from '@components/pages/processes/details';
import { Else, If, Then } from 'react-if';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'react-i18next';
import { ElectionProvider, useElection } from '@vocdoni/react-components';

const ProcessesDetailPage = () => {
  const { loading, election } = useElection();
  const { i18n } = useTranslation();

  return (
    <If condition={loading}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        <If condition={election !== undefined && !loading}>
          <Then>
            <ProcessDetailPage />
          </Then>
          <Else>
            <h1>{i18n.t('processes.details.process_not_found')}</h1>
          </Else>
        </If>
      </Else>
    </If>
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
