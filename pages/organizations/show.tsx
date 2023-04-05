import { Loader } from '@components/blocks/loader';
import { useBlockHeight, useEntity } from '@vocdoni/react-hooks';
import { useUrlHash } from 'use-url-hash';
import { EntityView } from '@components/pages/organizations/details/index';
import { useProcessesFromAccount } from '@hooks/use-processes';
import { ensure0x } from '@vocdoni/common';
import { Else, If, Then } from 'react-if';

const OrganizationsDetailPage = () => {
  const entityId = useUrlHash().slice(1);

  const { metadata, loading } = useEntity(ensure0x(entityId));
  const { blockHeight } = useBlockHeight();
  const { processes, loadingProcessList, loadingProcessesDetails } = useProcessesFromAccount(entityId);

  return (
    <If condition={!loading && !loadingProcessList && !loadingProcessesDetails}>
      <Then>
        <EntityView address={entityId} metadata={metadata} processes={processes} blockHeight={blockHeight} />
      </Then>
      <Else>
        <Loader visible />
      </Else>
    </If>
  );
};

export default OrganizationsDetailPage;
