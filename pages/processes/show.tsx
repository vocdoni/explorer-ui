import { Loader } from '@components/blocks/loader';
import ProcessDetailPage from '@components/pages/processes/details';
import { Else, If, Then } from 'react-if';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'react-i18next';
import { useProcessWrapper } from '@hooks/use-process-wrapper';

const ProcessesDetailPage = () => {
  const { i18n } = useTranslation();
  const processId = useUrlHash().slice(1);
  const { processInfo: processInfo, loadingInfo: loading, results } = useProcessWrapper(processId);

  return (
    <If condition={loading}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        {!!processInfo && !loading ? (
          <ProcessDetailPage processId={processId} processInfo={processInfo} results={results} />
        ) : (
          <h1>{i18n.t('processes.details.process_not_found')}</h1>
        )}
      </Else>
    </If>
  );
};

export default ProcessesDetailPage;
