import React from 'react';
import { ElectionStatus } from '@vocdoni/sdk';
import { ElectionStatusBadge } from '@vocdoni/chakra-components';

export const CustomElectionStatusBadge = ({ status }: { status: ElectionStatus }) => {
  switch (status) {
    case ElectionStatus.ONGOING:
      return <ElectionStatusBadge bg={'#f3fccc'} color={'#74af07'} variant={'vocdoni'} />;
    case ElectionStatus.RESULTS:
    case ElectionStatus.ENDED:
      return <ElectionStatusBadge bg={'#fff3d6'} color={'#db7d24'} variant={'vocdoni'} />;
    case ElectionStatus.UPCOMING:
      return <ElectionStatusBadge bg={'#d1fdfa'} color={'#1588b9'} variant={'vocdoni'} />;
    case ElectionStatus.PAUSED:
    case ElectionStatus.CANCELED:
      return <ElectionStatusBadge bg={'#fee4d6'} color={'#d62736'} variant={'vocdoni'} />;
    default:
      return <></>;
  }
};
