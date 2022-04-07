import { Typography, TypographyVariant } from '@components/elements/typography'
import { useEntityCount } from '@hooks/use-entities'
import { colors } from '@theme/colors'
import i18n from '@i18n'
import { ListPageTemplate } from '@components/pages/app/page-templates/list-page-template'
import { DashboardEntityList } from './entity-list'

export const DashboardShowEntities = () => {
  const { entitiesCount } = useEntityCount()

  const page_size = 10

  return (
    <ListPageTemplate
      title={i18n.t('organizations_list.organizations_list_title')}
      subtitle={i18n.t('organizations_list.total_n_organizations') + entitiesCount}
    >
      <DashboardEntityList
        totalCount={entitiesCount}
        pageSize={page_size}
      />
    </ListPageTemplate>
  )
}
