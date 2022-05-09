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
        <UpcomingBadge>{i18n.t('transactions.badge.newProcess')}</UpcomingBadge>
      </Case>
      <Case condition={type == TxType.setProcess}>
        <UpcomingBadge>{i18n.t('transactions.badge.setProcess')}</UpcomingBadge>
      </Case>
      <Case condition={type == TxType.registerKey}>
        <ActiveBadge>{i18n.t('transactions.badge.registerKey')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.mintTokens}>
        <ActiveBadge>{i18n.t('transactions.badge.mintTokens')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.sendTokens}>
        <CanceledBadge>
          {i18n.t('transactions.badge.sendTokens')}
        </CanceledBadge>
      </Case>
      <Case condition={type == TxType.setTransactionCosts}>
        <CanceledBadge>
          {i18n.t('transactions.badge.setTransactionCosts')}
        </CanceledBadge>
      </Case>
      <Case condition={type == TxType.setAccountInfo}>
        <CanceledBadge>
          {i18n.t('transactions.badge.setAccountInfo')}
        </CanceledBadge>
      </Case>

      <Case condition={type == TxType.setAccountDelegateTx}>
        <CanceledBadge>
          {i18n.t('transactions.badge.setAccountDelegateTx')}
        </CanceledBadge>
      </Case>
      <Case condition={type == TxType.collectFaucet}>
        <EndedBadge>{i18n.t('transactions.badge.collectFaucet')}</EndedBadge>
      </Case>
      <Case condition={type == TxType.setKeykeeper}>
        <CanceledBadge>
          {i18n.t('transactions.badge.setKeykeeper')}
        </CanceledBadge>
      </Case>
      <Default>
        <CanceledBadge>
          {i18n.t('transactions.badge.UNKNOWN')}
        </CanceledBadge>
      </Default>
    </Switch>
  )
}
