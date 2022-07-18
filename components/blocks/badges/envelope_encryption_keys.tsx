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
      <Case condition={type === 1}>
        <ActiveBadge>1</ActiveBadge>
      </Case>
      <Case condition={type === 2}>
        <ActiveBadge>2</ActiveBadge>
      </Case>
      <Case condition={type === 3}>
        <ActiveBadge>3</ActiveBadge>
      </Case>
      <Default>
        <CanceledBadge>
          {i18n.t('envelope.encryption_keys.none')}
        </CanceledBadge>
      </Default>
    </Switch>
  )
}
