import { BlockView } from '@components/pages/blocks/details';
import { Else, If, Then } from 'react-if';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'react-i18next';
import { useBlockByHash, useBlockByHeight } from '@hooks/use-voconi-sdk';
import { ensure0x, IChainBlockInfoResponse } from '@vocdoni/sdk';
import LoaderPage from '@components/pages/app/layout/loader-page';
import React from 'react';

const BlockOrLoadingView = ({
  block,
  loading,
  error,
}: {
  block: IChainBlockInfoResponse;
  loading: boolean;
  error: Error;
}) => {
  const { i18n } = useTranslation();

  return (
    <LoaderPage
      loading={loading}
      error={!!error}
      hasContent={!!block}
      errorMessage={i18n.t('blocks.details.block_not_found')}
    >
      <BlockView blockData={block}></BlockView>
    </LoaderPage>
  );
};

const BlockByHash = ({ hash }: { hash: string }) => {
  const { data: block, loading, loaded, error } = useBlockByHash({ hash });
  return <BlockOrLoadingView loading={loading || !loaded} block={block} error={error} />;
};

const BlockByHeight = ({ height }: { height: number }) => {
  const { data: block, loading, loaded, error } = useBlockByHeight({ height });
  return <BlockOrLoadingView loading={loading || !loaded} block={block} error={error} />;
};

const BlockDetailPage = () => {
  const blockHeightOrHash = useUrlHash().slice(1);
  return (
    <>
      <If condition={ensure0x(blockHeightOrHash).length === 66}>
        <Then>
          <BlockByHash hash={blockHeightOrHash} />
        </Then>
        <Else>
          <BlockByHeight height={+blockHeightOrHash} />
        </Else>
      </If>
    </>
  );
};

export default BlockDetailPage;
