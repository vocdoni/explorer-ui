import { EntityMetadata } from 'dvote-js'
import { SummaryProcess } from '@vocdoni/react-hooks'

import { getVoteStatus } from '@lib/util'

import { Typography, TypographyVariant } from '@components/elements/typography'
import { Grid, Column } from '@components/elements/grid'
import { PageCard } from '@components/elements/cards'
import { CardImageHeader } from '@components/blocks/card/image-header'
import { DashboardProcessListItem } from '@components/pages/organizations/components/process-list-item'
import i18n from '@i18n'
import RouterService from '@lib/router'
import { ELECTIONS_DETAILS } from '@const/routes'


interface IEntityViewProps {
  address: string,
  metadata: EntityMetadata,
  processes: SummaryProcess[],
  blockHeight: number,
}
export const EntityView = ({ address, metadata, processes, blockHeight }: IEntityViewProps) => {
  const plazaUrl = `${process.env.PLAZA_URL}/entity/#/0x${address}`

  return (
    <PageCard>
      <CardImageHeader
        title={metadata?.name.default}
        processImage={metadata?.media.header}
        // subtitle={entity?.name.default}
        entityImage={metadata?.media.avatar}
      />

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{i18n.t('entity.home.entity_description')}</Typography>
          <Typography variant={TypographyVariant.Small}>{metadata?.description.default}</Typography>
        </Column>
      </Grid>

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{i18n.t('entity.home.entity_address')} </Typography>
          <Typography variant={TypographyVariant.Small}>{address}<a href={plazaUrl} target='blank'>({i18n.t('entity.home.view_profile')})</a></Typography>
        </Column>
      </Grid>

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{i18n.t('entity.home.entity_processes')} </Typography>
          {processes.map((process, index) => {
            const processStatus = getVoteStatus(process.summary, blockHeight)
            
            return (
              <DashboardProcessListItem
                key={index}
                process={process}
                status={processStatus}
                accountName={metadata?.name.default}
                entityLogo={metadata?.media.header}
                link={ RouterService.instance.get(ELECTIONS_DETAILS, { electionsId: process.id }) }
              />
            )
          })}
          {processes.length <= 0 &&
            <Typography variant={TypographyVariant.Small}>{i18n.t('entity.home.no_processes_yet')} </Typography>
          }
        </Column>
      </Grid>
    </PageCard>
  )
}