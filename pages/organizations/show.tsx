import LoaderPage from '@components/pages/app/layout/loader-page';
import { OrganizationView } from '@components/pages/organizations/details';
import { OrganizationProvider, useOrganization } from '@vocdoni/react-providers';
import { ensure0x } from '@vocdoni/sdk';
import { useTranslation } from 'react-i18next';
import { useUrlHash } from 'use-url-hash';

const OrganizationsDetailPage = () => {
  const { organization, loading, errors, loaded } = useOrganization();
  const { i18n } = useTranslation();

  const error = errors.load?.length > 0 || errors.update?.length > 0;
  const hasContent = !!organization;
  const isLoading = loading || !loaded;

  return (
    <LoaderPage
      loading={isLoading}
      error={error}
      hasContent={hasContent}
      errorMessage={i18n.t('organizations.details.organization_not_found')}
    >
      <OrganizationView id={organization?.address} />
    </LoaderPage>
  );
};

const OrganizationHome = () => {
  const organizationId = useUrlHash().slice(1);
  return (
    <OrganizationProvider id={ensure0x(organizationId)}>
      <OrganizationsDetailPage />
    </OrganizationProvider>
  );
};

export default OrganizationHome;
