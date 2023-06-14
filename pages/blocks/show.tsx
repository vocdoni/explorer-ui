import { Loader } from '@components/blocks/loader';
import { BlockView } from '@components/pages/blocks/details';
import { Else, If, Then } from 'react-if';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'react-i18next';
import { useBlockByHash, useBlockByHeight } from '@hooks/use-voconi-sdk';
import { ensure0x, IChainBlockInfoResponse } from '@vocdoni/sdk';

const BlockOrLoadingView = ({ block, loading }: { block: IChainBlockInfoResponse; loading: boolean }) => {
  const { i18n } = useTranslation();

  return (
    <If condition={block && !loading}>
      <Then>
        <BlockView blockData={block}></BlockView>
      </Then>
      <Else>
        <If condition={block === null && !loading}>
          <Then>
            <h1>{i18n.t('blocks.details.block_not_found')}</h1>
          </Then>
          <Else>
            <Loader visible />
          </Else>
        </If>
      </Else>
    </If>
  );
};

const BlockByHash = ({ hash }: { hash: string }) => {
  const { data: block, loading } = useBlockByHash({ hash });
  return <BlockOrLoadingView loading={loading} block={block} />;
};

const BlockByHeight = ({ height }: { height: number }) => {
  const { data: block, loading } = useBlockByHeight({ height });
  return <BlockOrLoadingView loading={loading} block={block} />;
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
