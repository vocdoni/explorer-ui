import { Typography, TypographyVariant } from '@components/elements/typography'
import { useEntityCount } from '@hooks/use-entities'
import { colors } from '@theme/colors'
import i18n from '@i18n'
import { ListPageTemplate } from '@components/pages/app/page-templates/list-page-template'

interface IDashboardShowEntitiesProps {}
const ENTITIES_PER_PAGE = 10

export const DashboardShowEntities = ({}: IDashboardShowEntitiesProps) => {
  const { entitiesCount } = useEntityCount({})

  return (
    <ListPageTemplate
      title={i18n.t('organizations_list.organizations_list_title')}
      subtitle={i18n.t('organizations_list.total_n_organizations') + entitiesCount}
    >
      {/* <DashboardProcessList
        totalProcessCount={processCount}
        pageSize={PROCESS_PER_PAGE}
      /> */}
    </ListPageTemplate>
  )
}
