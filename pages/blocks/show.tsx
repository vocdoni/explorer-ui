import { Loader } from '@components/blocks/loader';
import { BlockView } from '@components/pages/blocks/details';
import { useBlock } from '@hooks/use-blocks';
import { Else, If, Then } from 'react-if';
import { useUrlHash } from 'use-url-hash';
import { useTranslation } from 'react-i18next';
import { useBlockByHeight } from '@hooks/use-voconi-sdk';

const BlockDetailPage = () => {
  const { i18n } = useTranslation();
  const blockHeight: number = +useUrlHash().slice(1);
  const { data: block, loading } = useBlockByHeight({ height: blockHeight });

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

export default BlockDetailPage;
