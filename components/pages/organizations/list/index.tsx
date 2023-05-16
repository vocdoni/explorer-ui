import { useTranslation } from 'react-i18next';
import { ListPage } from '@components/pages/app/page-templates/list-page';
import { DashboardEntityList } from './organization-list';
import { useOrganizationCount } from '@hooks/use-voconi-sdk';

export const DashboardShowEntities = () => {
  const { i18n } = useTranslation();
  const { data: entitiesCount } = useOrganizationCount();
  const count = entitiesCount?.count ?? 0;

  const page_size = 10;

  return (
    <DashboardEntityList
      totalCount={count}
      pageSize={page_size}
      title={
        <ListPage
          title={i18n.t('organizations.list.organizations_list_title')}
          subtitle={i18n.t('organizations.count') + count}
        />
      }
    />
  );
};
