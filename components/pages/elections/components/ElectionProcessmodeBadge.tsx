import { useTranslation } from 'react-i18next';
import { CustomTag } from '@components/elements/CustomTag';

interface ProcessModeBadgeProps {
  autostart: boolean;
}

export const ProcessModeBadge = ({ autostart }: ProcessModeBadgeProps) => {
  const { i18n } = useTranslation();

  return (
    <CustomTag>
      {autostart
        ? i18n.t('processes.process_mode_badge.autostart')
        : i18n.t('processes.process_mode_badge.notAutostart')}
    </CustomTag>
  );
};
