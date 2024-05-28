import { BlockView } from '@components/pages/blocks/details';
import { Else, If, Then } from 'react-if';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'next-i18next';
import { useBlockByHash, useBlockByHeight } from '@hooks/use-voconi-sdk';
import { ensure0x, IChainBlockInfoResponse } from '@vocdoni/sdk';
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

const BlockOrLoadingView = ({
  block,
  loading,
  error,
}: {
  block: IChainBlockInfoResponse;
  loading: boolean;
  error: Error;
}) => {
  const { t } = useTranslation();
  return (
    <LoaderPage
      loading={loading}
      error={!!error}
      hasContent={!!block}
      errorMessage={t('blocks.details.block_not_found')}
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
