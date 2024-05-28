import { useTranslation } from 'next-i18next';
import { ListPage } from '@components/pages/app/page-templates/list-page';
import { DashboardEntityList } from './OrganizationList';
import { useOrganizationCount } from '@hooks/use-voconi-sdk';

export const DashboardShowEntities = () => {
  const { t } = useTranslation();
  const { data: entitiesCount } = useOrganizationCount();
  const count = entitiesCount?.count ?? 0;

  const page_size = 10;

  return (
    <DashboardEntityList
      totalCount={count}
      pageSize={page_size}
      title={
        <ListPage
          title={t('organizations.list.organizations_list_title')}
          subtitle={t('organizations.count') + count}
        />
      }
    />
  );
};
