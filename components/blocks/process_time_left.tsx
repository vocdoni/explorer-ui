import React from 'react';
import { localizedDateDiff } from '@lib/date';
import { useTranslation } from 'react-i18next';
import { ItemDate } from '@components/elements/styled-divs';
import { ElectionStatus } from '@vocdoni/sdk';

export const ProcessTimeLeft = ({
  status,
  startDate,
  endDate,
}: {
  status: ElectionStatus;
  startDate: Date;
  endDate: Date;
}) => {
  const { i18n } = useTranslation();

  let date: string;
  switch (status) {
    case ElectionStatus.ONGOING: {
      date = localizedDateDiff(endDate);
      break;
    }

    case ElectionStatus.RESULTS: {
      if (new Date(endDate) < new Date()) {
        date = i18n.t('dashboard.process_ended');
      } else date = localizedDateDiff(endDate);
      break;
    }

    case ElectionStatus.ENDED:
      date = i18n.t('dashboard.process_ended');
      break;

    case ElectionStatus.PAUSED:
    case ElectionStatus.UPCOMING:
      if (new Date(startDate) > new Date() && status === ElectionStatus.PAUSED) {
        date = i18n.t('dashboard.process_paused');
        break;
      }

      date = localizedDateDiff(startDate);
      break;
  }

  return <ItemDate>{date}</ItemDate>;
};
