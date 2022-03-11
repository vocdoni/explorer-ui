import i18n from '@i18n'
import { UpcomingBadge, ActiveBadge } from '@components/elements/text-badge'
import { Switch, Case, Default } from 'react-if'

export const NProcessesBadge = ({ processes }: { processes: number }) => {
  const text = i18n.t(`entities.processes`)
  return (
    <Switch>
      <Case condition={processes == 1}>
        <UpcomingBadge>
          {text}: {processes}
        </UpcomingBadge>
      </Case>
      <Default>
        <ActiveBadge>{text}: {processes}</ActiveBadge>
      </Default>
    </Switch>
  )
}
