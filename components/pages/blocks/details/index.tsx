import { BlockCard } from "@components/blocks/card/block-card"
import { PageCard } from "@components/elements/cards"
import { Column, Grid } from "@components/elements/grid"
import { Typography, TypographyVariant } from "@components/elements/typography"
import i18n from "@i18n"
import { BlockInfo } from "@lib/types"


export const BlockView = ({ blockData }: { blockData: BlockInfo }) => {

  return (
    <PageCard>

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{i18n.t('blocks.details.block_details')}</Typography>
        </Column>
      </Grid>
      <BlockCard blockData={blockData} lg={8} moreDetails/>
    </PageCard>
  )
}