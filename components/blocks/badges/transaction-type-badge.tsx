import { useTranslation } from 'react-i18next'
import {
  ActiveBadge,
  UpcomingBadge,
  EndedBadge,
  CanceledBadge,
} from '@components/elements/text-badge'
import { TxType } from '@lib/types'
import { BaseStatusBadge } from '@components/elements/card-badge'
import styled from 'styled-components'


export const TransactionTypeBadge = ({ type }: { type: TxType }) => {
  const { i18n } = useTranslation()
  switch (type) {
    case TxType.vote:
      return <ActiveBadge>{i18n.t('transactions.badge.vote')}</ActiveBadge>
    case TxType.admin:
      return <ActiveBadge>{i18n.t('transactions.badge.admin')}</ActiveBadge>
    case TxType.newProcess:
      return (
        <UpcomingBadge>
          {i18n.t('transactions.badge.new_process')}
        </UpcomingBadge>
      )
    case TxType.setProcess:
      return (
        <UpcomingBadge>
          {i18n.t('transactions.badge.set_process')}
        </UpcomingBadge>
      )
    case TxType.registerKey:
      return (
        <ActiveBadge>{i18n.t('transactions.badge.register_key')}</ActiveBadge>
      )
    case TxType.mintTokens:
      return (
        <ActiveBadge>{i18n.t('transactions.badge.mint_tokens')}</ActiveBadge>
      )
    case TxType.sendTokens:
      return (
        <ActiveBadge>
          {i18n.t('transactions.badge.send_tokens')}{' '}
        </ActiveBadge>
      )
    case TxType.setTransactionCosts:
      return (
        <ActiveBadge>
          {i18n.t('transactions.badge.set_transaction_costs')}{' '}
        </ActiveBadge>
      )
    case TxType.setAccountInfo:
      return (
        <ActiveBadge>
          {i18n.t('transactions.badge.set_account_info')}{' '}
        </ActiveBadge>
      )
    case TxType.setAccountDelegateTx:
      return (
        <ActiveBadge>
          {i18n.t('transactions.badge.set_account_delegate_tx')}{' '}
        </ActiveBadge>
      )
    case TxType.collectFaucet:
      return (
        <ActiveBadge>{i18n.t('transactions.badge.collect_faucet')}</ActiveBadge>
      )
    case TxType.setKeykeeper:
      return (
        <ActiveBadge>
          {i18n.t('transactions.badge.set_key_keeper')}
        </ActiveBadge>
      )
    default:
      return (
        <ActiveBadge>{i18n.t('transactions.badge.unknown')}</ActiveBadge>
      )
  }
}

// Todo: Implement this
const VoteBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const NewProcessBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const AdminBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const SetProcessBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const RegisterKeyBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const MintTokensBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const SendTokensBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const SetTransactionCostsBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const SetAccountInfoBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const SetAccountDelegateTxBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const CollectFaucetBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`

const SetKeykeeperBadge =  styled(BaseStatusBadge)`
  color: #74AF07;
  background: #F3FCCC;
`
