import i18n from '@i18n'
import { ListPageTemplate } from '@components/pages/app/page-templates/list-page-template'
import { useBlockHeight } from '@vocdoni/react-hooks'
import { DashboardBlockList } from './block-list'

const PER_PAGE = 10

export const DashboardShowBlocks = () => {
  const { blockHeight } = useBlockHeight()

  return (
    <ListPageTemplate
      title={i18n.t('blocks_list.blocks_list_title')}
      subtitle={i18n.t('blocks_list.current_block_heigh') + blockHeight}
    >
        <DashboardBlockList blockHeight={blockHeight}></DashboardBlockList>

    </ListPageTemplate>
  )
}
