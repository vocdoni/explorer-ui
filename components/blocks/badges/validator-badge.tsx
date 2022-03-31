import i18n from '@i18n'
import {
  ActiveBadge,
} from '@components/elements/text-badge'

export const ValidatorPowerBadge = ({ power }: { power: number }) => {
  return (<ActiveBadge>{i18n.t('validators.voting_power')}{power}</ActiveBadge>)
}
