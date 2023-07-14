import { OrganizationAvatar } from '@vocdoni/chakra-components';
import { FALLBACK_ORGANIZATION_AVATAR, FALLBACK_ORGANIZATION_HEADER } from '@const/account';
import React from 'react';
import { IPFSImageProps } from '@vocdoni/chakra-components/dist/components/layout';

export const CustomOrganizationAvatar = (props: IPFSImageProps) => (
  <OrganizationAvatar fallbackSrc={FALLBACK_ORGANIZATION_AVATAR} {...props} />
);

export const CustomOrganizationHeader = (props: IPFSImageProps) => (
  <OrganizationAvatar fallbackSrc={FALLBACK_ORGANIZATION_HEADER} {...props} />
);
