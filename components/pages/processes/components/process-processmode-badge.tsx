import { useTranslation } from 'react-i18next';
import { BaseStatusBadge } from '@components/elements/card-badge';

interface ProcessModeBadgeProps {
  autostart: boolean;
}

export const ProcessModeBadge = ({ autostart }: ProcessModeBadgeProps) => {
  const { i18n } = useTranslation();

  return (
    <BaseStatusBadge>
      {autostart
        ? i18n.t('processes.process_mode_badge.autostart')
        : i18n.t('processes.process_mode_badge.notAutostart')}
    </BaseStatusBadge>
  );
};
