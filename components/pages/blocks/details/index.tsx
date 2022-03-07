import { PageCard } from "@components/elements/cards"
import { Column, Grid } from "@components/elements/grid"
import { Typography, TypographyVariant } from "@components/elements/typography"
import i18n from "@i18n"
import { BlockInfo } from "@lib/types"


export const BlockView = ({ blockInfo }: { blockInfo: BlockInfo }) => {

  return (
    <PageCard>

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{i18n.t('blocks.details.block_details')}</Typography>
          <Typography variant={TypographyVariant.Small}>{i18n.t('blocks.details.block_height')}{blockInfo?.height}</Typography>
        </Column>
      </Grid>


      <Grid>
        <Column sm={12}>
            Details
          {/* <Typography variant={TypographyVariant.Body1}>{i18n.t('entity.home.entity_processes')} </Typography>
          {processes.map((process, index) => {
            const processStatus = getVoteStatus(process.summary, blockHeight)
            
            return (
              <ProcessListItem 
                key={index}
                process={process}
                entityId={address}
                entityLogo={metadata?.media.header}
                link={ RouterService.instance.get(ELECTIONS_DETAILS, { electionsId: process.id }) }
                entityMetadata={metadata}
              />
            )
          })}
          {processes.length <= 0 &&
            <Typography variant={TypographyVariant.Small}>{i18n.t('entity.home.no_processes_yet')} </Typography>
          } */}
        </Column>
      </Grid>
    </PageCard>
  )
}