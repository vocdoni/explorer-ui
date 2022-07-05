import { useEntityCount } from '@hooks/use-entities'
import { useTranslation } from 'react-i18next'
import { ListPage } from '@components/pages/app/page-templates/list-page'
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
        <ListPage
          title={i18n.t('organizations.list.organizations_list_title')}
          subtitle={i18n.t('organizations.total_n_organizations') + entitiesCount}
        />
      }
    />
  )
}
