import { useTranslation } from 'react-i18next'
import { Switch, Case, Default } from 'react-if'
import {
  ActiveBadge,
  CanceledBadge,
} from '@components/elements/text-badge'

export const EncryptionKeysIndexesBadge = ({ type }: { type: number }) => {
  const { i18n } = useTranslation()
  return (
    <Switch>
      <Case condition={type > 0}>
        <ActiveBadge>{type}</ActiveBadge>
      </Case>
      <Default>
        <CanceledBadge>
          {i18n.t('envelopes.encryption_keys.none')}
        </CanceledBadge>
      </Default>
    </Switch>
  )
}
