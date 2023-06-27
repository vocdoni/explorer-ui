import { Loader } from '@components/blocks/loader';
import { useUrlHash } from 'use-url-hash';
import { OrganizationView } from '@components/pages/organizations/details/index';
import { Else, If, Then } from 'react-if';
import { OrganizationProvider, useOrganization } from '@vocdoni/chakra-components';
import { useTranslation } from 'react-i18next';
import { ensure0x } from '@vocdoni/sdk';

const OrganizationsDetailPage = () => {
  const { organization, loading, errors } = useOrganization();
  const { i18n } = useTranslation();

  return (
    <If condition={errors.load || errors.update}>
      <Then>{i18n.t('organizations.details.organization_not_found')}</Then>
      <Else>
        <If condition={!loading}>
          <Then>
            <OrganizationView id={organization?.address} />
          </Then>
          <Else>
            <Loader visible />
          </Else>
        </If>
      </Else>
    </If>
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
