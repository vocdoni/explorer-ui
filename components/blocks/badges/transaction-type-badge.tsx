import i18n from '@i18n'
import { Switch, Case } from 'react-if'
import {
  ActiveBadge,
  UpcomingBadge,
  EndedBadge,
  CanceledBadge,
} from '@components/elements/text-badge'
import { TxType } from '@lib/types'

export const TransactionTypeBadge = ({ type }: { type: TxType }) => {
  return (
    <Switch>
      <Case condition={type == TxType.VOTE}>
        <ActiveBadge>{i18n.t('transactions.type.VOTE')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.NEW_PROCESS}>
        <UpcomingBadge>{i18n.t('transactions.type.NEW_PROCESS')}</UpcomingBadge>
      </Case>
      <Case condition={type == TxType.SET_PROCESS}>
        <UpcomingBadge>{i18n.t('transactions.type.SET_PROCESS')}</UpcomingBadge>
      </Case>
      <Case condition={type == TxType.ADD_ORACLE}>
        <ActiveBadge>{i18n.t('transactions.type.ADD_ORACLE')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.ADD_VALIDATOR}>
        <ActiveBadge>{i18n.t('transactions.type.ADD_VALIDATOR')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.CANCEL_PROCESS}>
        <EndedBadge>{i18n.t('transactions.type.CANCEL_PROCESS')}</EndedBadge>
      </Case>
      <Case condition={type == TxType.REMOVE_ORACLE}>
        <CanceledBadge>
          {i18n.t('transactions.type.REMOVE_ORACLE')}
        </CanceledBadge>
      </Case>
      <Case condition={type == TxType.REMOVE_VALIDATOR}>
        <CanceledBadge>
          {i18n.t('transactions.type.REMOVE_VALIDATOR')}
        </CanceledBadge>
      </Case>
    </Switch>
  )
}
