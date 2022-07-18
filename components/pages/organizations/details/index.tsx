import { EntityMetadata } from 'dvote-js'
import { SummaryProcess } from '@vocdoni/react-hooks'

import { getVoteStatus } from '@lib/util'

import { Typography, TypographyVariant } from '@components/elements/typography'
import { Grid, Column } from '@components/elements/grid'
import { PageCard } from '@components/elements/cards'
import { CardImageHeader } from '@components/blocks/card/image-header'
import { useTranslation } from 'react-i18next'
import { ProcessListItem } from '@components/blocks/card/process-item'
import { getProcessDetailsPath } from '@components/pages/app/components/get-links'
import { BreakWord } from '@components/elements/styled-divs'

interface IEntityViewProps {
  address: string
  metadata: EntityMetadata
  processes: SummaryProcess[]
  blockHeight: number
}
export const EntityView = ({
  address,
  metadata,
  processes,
  blockHeight,
}: IEntityViewProps) => {
  const correctedAddress = address.startsWith('0x') ? address : '0x' + address
  const plazaUrl = `${process.env.PLAZA_URL}/entity/#/${correctedAddress}`
  const { i18n } = useTranslation()

  return (
    <PageCard>
      <CardImageHeader
        title={metadata?.name.default}
        processImage={metadata?.media.header}
        // subtitle={entity?.name.default}
        entityImage={metadata?.media.avatar}
      />

      {metadata?.description.default && (
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.Body1}>
              {i18n.t('organizations.details.organization_description')}
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              {metadata?.description.default}
            </Typography>
          </Column>
        </Grid>
      )}

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>
            {i18n.t('organizations.details.organization_address')}{' '}
          </Typography>
          <Typography variant={TypographyVariant.Small}>
            <BreakWord>
              {correctedAddress}
              <a href={plazaUrl} target="blank">
                ({i18n.t('organization.home.view_profile')})
              </a>
            </BreakWord>
          </Typography>
        </Column>
      </Grid>

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>
            {i18n.t('organizations.details.organization_processes')}{' '}
          </Typography>
          {processes.map((process, index) => {
            const processStatus = getVoteStatus(process.summary, blockHeight)

            return (
              <ProcessListItem
                key={index}
                process={process}
                entityId={process.id}
                entityLogo={null}
                link={getProcessDetailsPath(process.id)}
                entityMetadata={metadata}
                hideEntity={true}
              />
            )
          })}
          {processes.length <= 0 && (
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('organizations.details.no_processes_yet')}{' '}
            </Typography>
          )}
        </Column>
      </Grid>
    </PageCard>
  )
}
