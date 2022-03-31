import { ColumnProps } from '@components/elements/grid'
import i18n from '@i18n'
import { Validator } from '@lib/types'
import { ValidatorPowerBadge } from '../badges/validator-badge'
import { GenericListItemWithBadge } from '../list-items'

export const ValidatorCard = ({
  sm,
  md,
  lg,
  xl,
  validatorData,
}: ColumnProps & {
  validatorData: Validator
}) => {

  return (
    <GenericListItemWithBadge
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      topLeft={
        <>

        </>
      }
      badge={<ValidatorPowerBadge power={validatorData.power}/> }
      // dateText={localizedDateDiff(new Date(blockData?.timestamp))}
      link={
        null
        // blockData?.height && !moreDetails
        //   ? RouterService.instance.get(BLOCKS_DETAILS, {
        //       blockHeight: blockData?.height?.toString(),
        //     })
        //   : null
      }
      title={validatorData.address}
      dateText={"PubKey: " + validatorData.pubKey}
    >
    </GenericListItemWithBadge>
  )
}
