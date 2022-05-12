import { Typography, TypographyVariant } from '@components/elements/typography'
import { useEntityCount } from '@hooks/use-entities'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { ListPageTitle } from '@components/pages/app/page-templates/list-page-template'
import { DashboardEntityList } from './entity-list'

export const DashboardShowEntities = () => {
  const { i18n } = useTranslation()
  const { entitiesCount } = useEntityCount()

  const page_size = 10

  return (
    <DashboardEntityList
      totalCount={entitiesCount}
      pageSize={page_size}
      title={
        <ListPageTitle
          title={i18n.t('entities.list.organizations_list_title')}
          subtitle={i18n.t('entities.total_n_organizations') + entitiesCount}
        />
      }
    />
  )
}
