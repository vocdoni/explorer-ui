import { useTranslation } from 'next-i18next';
import { CustomTag } from '@components/elements/CustomTag';

interface ProcessModeBadgeProps {
  autostart: boolean;
}

export const ProcessModeBadge = ({ autostart }: ProcessModeBadgeProps) => {
  const { t } = useTranslation();
  return (
    <CustomTag>
      {autostart ? t('processes.process_mode_badge.autostart') : t('processes.process_mode_badge.notAutostart')}
    </CustomTag>
  );
};
