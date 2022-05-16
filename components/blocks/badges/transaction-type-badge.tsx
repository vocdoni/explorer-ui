import { useTranslation } from 'react-i18next'
import { Switch, Case, Default } from 'react-if'
import {
  ActiveBadge,
  UpcomingBadge,
  EndedBadge,
  CanceledBadge,
} from '@components/elements/text-badge'
import { TxType } from '@lib/types'

export const TransactionTypeBadge = ({ type }: { type: TxType }) => {
  const { i18n } = useTranslation()
  return (
    <Switch>
      <Case condition={type == TxType.vote}>
        <ActiveBadge>{i18n.t('transactions.badge.vote')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.admin}>
        <ActiveBadge>{i18n.t('transactions.badge.admin')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.newProcess}>
        <UpcomingBadge>{i18n.t('transactions.badge.new_process')}</UpcomingBadge>
      </Case>
      <Case condition={type == TxType.setProcess}>
        <UpcomingBadge>{i18n.t('transactions.badge.set_process')}</UpcomingBadge>
      </Case>
      <Case condition={type == TxType.registerKey}>
        <ActiveBadge>{i18n.t('transactions.badge.register_key')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.mintTokens}>
        <ActiveBadge>{i18n.t('transactions.badge.mint_tokens')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.sendTokens}>
        <CanceledBadge>
          {i18n.t('transactions.badge.send_tokens')}
        </CanceledBadge>
      </Case>
      <Case condition={type == TxType.setTransactionCosts}>
        <CanceledBadge>
          {i18n.t('transactions.badge.set_transaction_costs')}
        </CanceledBadge>
      </Case>
      <Case condition={type == TxType.setAccountInfo}>
        <CanceledBadge>
          {i18n.t('transactions.badge.set_account_info')}
        </CanceledBadge>
      </Case>

      <Case condition={type == TxType.setAccountDelegateTx}>
        <CanceledBadge>
          {i18n.t('transactions.badge.set_account_delegate_tx')}
        </CanceledBadge>
      </Case>
      <Case condition={type == TxType.collectFaucet}>
        <EndedBadge>{i18n.t('transactions.badge.collect_faucet')}</EndedBadge>
      </Case>
      <Case condition={type == TxType.setKeykeeper}>
        <CanceledBadge>
          {i18n.t('transactions.badge.set_key_keeper')}
        </CanceledBadge>
      </Case>
      <Default>
        <CanceledBadge>
          {i18n.t('transactions.badge.unknown')}
        </CanceledBadge>
      </Default>
    </Switch>
  )
}
