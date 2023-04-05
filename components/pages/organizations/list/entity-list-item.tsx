import { EntityCard } from '@components/blocks/card/entity-card';
import { getOrganizationPath } from '@components/pages/app/components/get-links';
import { useProcessCount } from '@hooks/use-processes';
import { useEntity } from '@vocdoni/react-hooks';
import { EntityMetadata } from 'dvote-js';
import React from 'react';
import { ensure0x } from '@vocdoni/common';

interface IDashboardEntityItemProps {
  entityId: string;
}

export const DashboardEntityListItem = ({ entityId }: IDashboardEntityItemProps) => {
  const { processCount } = useProcessCount({ entityId });
  const { metadata } = useEntity(ensure0x(entityId));
  const entityMetadata = metadata as EntityMetadata;
  const entityDetailLink = getOrganizationPath(entityId);

  const entityName = entityMetadata?.name?.default ? entityMetadata?.name?.default : entityId;

  return (
    <EntityCard
      processCount={processCount}
      entityId={entityId}
      entityLogo={metadata?.media.avatar}
      link={entityDetailLink}
      entityName={entityName}
    />
  );
};
