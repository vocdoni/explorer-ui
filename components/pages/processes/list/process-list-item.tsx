import React from 'react';
import { SummaryProcess } from '@vocdoni/react-hooks';

import { PROCESS_DETAILS } from '@const/routes';
import { getPath } from '@components/pages/app/components/get-links';

import { ProcessCard } from '@components/blocks/card/process-card';

interface IDashboardProcessListItemProps {
  process: SummaryProcess;
  entityId: string;
}

export const DashboardProcessListItem = ({ process, entityId }: IDashboardProcessListItemProps) => {
  const processDetailPath = getPath(PROCESS_DETAILS, {
    processId: process.id,
  });

  return <ProcessCard process={process} entityId={entityId} link={processDetailPath}></ProcessCard>;
};
