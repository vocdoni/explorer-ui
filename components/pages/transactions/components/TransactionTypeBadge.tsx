import { useTranslation } from 'next-i18next';
import { ActiveBadge, UpcomingBadge } from '@components/elements/text-badge';
import { TransactionType } from '@vocdoni/sdk';

export const TransactionTypeBadge = ({ type }: { type: TransactionType }) => {
  const { t } = useTranslation();
  switch (type) {
    case TransactionType.VOTE_ENVELOPE:
      return <ActiveBadge>{t('transactions.badge.vote')}</ActiveBadge>;
    case TransactionType.ADMIN_TX:
      return <ActiveBadge>{t('transactions.badge.admin')}</ActiveBadge>;
    case TransactionType.NEW_PROCESS_TX:
      return <UpcomingBadge>{t('transactions.badge.new_process')}</UpcomingBadge>;
    case TransactionType.SET_PROCESS_TX:
      return <UpcomingBadge>{t('transactions.badge.set_process')}</UpcomingBadge>;
    case TransactionType.REGISTER_KEY_TX:
      return <ActiveBadge>{t('transactions.badge.register_key')}</ActiveBadge>;
    case TransactionType.MINT_TOKENS_TX:
      return <ActiveBadge>{t('transactions.badge.mint_tokens')}</ActiveBadge>;
    case TransactionType.SEND_TOKENS_TX:
      return <ActiveBadge>{t('transactions.badge.send_tokens')} </ActiveBadge>;
    case TransactionType.SET_TRANSACTION_COSTS_TX:
      return <ActiveBadge>{t('transactions.badge.set_transaction_costs')} </ActiveBadge>;
    case TransactionType.SET_ACCOUNT_TX:
      return <ActiveBadge>{t('transactions.badge.set_account_info')} </ActiveBadge>;
    case TransactionType.COLLECT_FAUCET_TX:
      return <ActiveBadge>{t('transactions.badge.collect_faucet')}</ActiveBadge>;
    case TransactionType.SET_KEYKEEPER_TX:
      return <ActiveBadge>{t('transactions.badge.set_key_keeper')}</ActiveBadge>;
    default:
      return <ActiveBadge>{t('transactions.badge.unknown')}</ActiveBadge>;
  }
};
