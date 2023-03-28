import React from 'react';
import { useBlockStatus } from '@vocdoni/react-hooks';
import { ProcessSummary, VotingApi } from 'dvote-js';
import { localizedDateDiff } from '@lib/date';
import { useTranslation } from 'react-i18next';
import { ItemDate } from '@components/elements/styled-divs';
import { ElectionStatus } from '@vocdoni/sdk';

export const ProcessTimeLeft = ({ status, summary }: { status: ElectionStatus; summary?: ProcessSummary }) => {
  const { i18n } = useTranslation();

  const { blockStatus } = useBlockStatus();

  let startDate;
  let date: string;
  switch (status) {
    case ElectionStatus.ONGOING: {
      const endDate = VotingApi.estimateDateAtBlockSync(summary?.endBlock, blockStatus);
      date = localizedDateDiff(endDate);
      break;
    }

    case ElectionStatus.ENDED:
      date = i18n.t('dashboard.process_ended');
      break;

    case ElectionStatus.PAUSED:
    case ElectionStatus.UPCOMING:
      startDate = VotingApi.estimateDateAtBlockSync(summary?.startBlock, blockStatus);

      if (new Date(startDate) > new Date() && status === ElectionStatus.PAUSED) {
        date = i18n.t('dashboard.process_paused');
        break;
      }

      date = localizedDateDiff(startDate);
      break;
  }

  return <ItemDate>{date}</ItemDate>;
};
