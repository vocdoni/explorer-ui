import { ListPage } from '@components/pages/app/page-templates/list-page';
import { DashboardBlockList } from './BlockList';
import { useTranslation } from 'react-i18next';
import { useBlockHeight } from '@hooks/use-voconi-sdk';

export const DashboardShowBlocks = () => {
  const { blockHeight } = useBlockHeight();
  const { i18n } = useTranslation();

  const page_size = 10;

  return (
    <DashboardBlockList
      blockHeight={blockHeight}
      pageSize={page_size}
      title={
        <ListPage
          title={i18n.t('blocks.list.blocks')}
          subtitle={blockHeight != null ? i18n.t('blocks.list.count') + ': ' + blockHeight?.toString() : ''}
        />
      }
    ></DashboardBlockList>
  );
};
