import { useTranslation } from 'next-i18next';
import { UpcomingBadge, ActiveBadge } from '@components/elements/text-badge';
import { Switch, Case, Default } from 'react-if';

export const NProcessesBadge = ({ processes }: { processes: number }) => {
  const { t } = useTranslation();
  const text = t('organizations.upcoming_processes_badge.processes');
  return (
    <Switch>
      <Case condition={processes == 1}>
        <UpcomingBadge>
          {text}: {processes}
        </UpcomingBadge>
      </Case>
      <Default>
        <ActiveBadge>
          {text}: {processes}
        </ActiveBadge>
      </Default>
    </Switch>
  );
};
