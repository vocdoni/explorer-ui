import { useTranslation } from 'react-i18next'
import { Switch, Case } from 'react-if'
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
      <Case condition={type == TxType.VOTE}>
        <ActiveBadge>{i18n.t('transactions.badge.VOTE')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.ADMIN}>
        <ActiveBadge>{i18n.t('transactions.ADMIN')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.NEW_PROCESS}>
        <UpcomingBadge>{i18n.t('transactions..badge.NEW_PROCESS')}</UpcomingBadge>
      </Case>
      <Case condition={type == TxType.SET_PROCESS}>
        <UpcomingBadge>{i18n.t('transactions..badge.SET_PROCESS')}</UpcomingBadge>
      </Case>
      <Case condition={type == TxType.ADD_ORACLE}>
        <ActiveBadge>{i18n.t('transactions..badge.ADD_ORACLE')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.ADD_VALIDATOR}>
        <ActiveBadge>{i18n.t('transactions..badge.ADD_VALIDATOR')}</ActiveBadge>
      </Case>
      <Case condition={type == TxType.CANCEL_PROCESS}>
        <EndedBadge>{i18n.t('transactions..badge.CANCEL_PROCESS')}</EndedBadge>
      </Case>
      <Case condition={type == TxType.REMOVE_ORACLE}>
        <CanceledBadge>
          {i18n.t('transactions..badge.REMOVE_ORACLE')}
        </CanceledBadge>
      </Case>
      <Case condition={type == TxType.REMOVE_VALIDATOR}>
        <CanceledBadge>
          {i18n.t('transactions..badge.REMOVE_VALIDATOR')}
        </CanceledBadge>
      </Case>
    </Switch>
  )
}
