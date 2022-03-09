import i18n from '@i18n'
import { Switch, Case, Default } from 'react-if'
import { UpcomingBadge, EndedBadgeLight } from '@components/elements/text-badge'
import { VochainCensusOrigin } from 'dvote-js'


export const NTransactionsBadge = ({
    transactions,
}: {transactions: number}) => {
  const text = i18n.t('blocks.transactions') + transactions
  return (
    <Switch>
      <Case condition={ transactions === 0 }>
        <EndedBadgeLight>{text}</EndedBadgeLight>
      </Case>
      <Default>
        <UpcomingBadge>{text}</UpcomingBadge>
      </Default>
    </Switch>
  )
}
