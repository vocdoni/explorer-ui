import { ListPage } from '@components/pages/app/page-templates/list-page'
import { useBlockHeight } from '@vocdoni/react-hooks'
import { DashboardBlockList } from './block-list'
import { useTranslation } from 'react-i18next'

export const DashboardShowBlocks = () => {
  const { blockHeight } = useBlockHeight()
  const { i18n } = useTranslation()

  const page_size = 10

  return (
    <DashboardBlockList
      blockHeight={blockHeight}
      pageSize={page_size}
      title={
        <ListPage
          title={i18n.t('blocks.list.blocks_list_title')}
          subtitle={
            blockHeight != null
              ? i18n.t('blocks.list.current_block_heigh') +
                ': ' +
                blockHeight?.toString()
              : ''
          }
        />
      }
    ></DashboardBlockList>
  )
}
