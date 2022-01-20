// import { CardImageHeader } from '@components/blocks/card/image-header'
// import { PageCard } from '@components/elements/cards'
// import React, { Fragment, useEffect, useState } from 'react'
// import { Unless, When } from 'react-if'
// import i18n from '@i18n'

// const OrganizationDetailPage = () => {
//   const [loading, setLoading] = useState(false)

//   return (
//     <PageCard>
//       <CardImageHeader
//         title={processInfo?.metadata?.title?.default}
//         processImage={processInfo?.metadata?.media?.header}
//         subtitle={entityMetadata?.name?.default}
//         entityImage={entityMetadata?.media?.avatar}
//       />

//       <When condition={loading}>
//         <p>{i18n.t('elections.please_wait')}</p>
//       </When>

//       <Unless condition={loading || !processInfo}>
//         <p>{i18n.t('elections.loaded')}</p>

//       </Unless>
//     </PageCard>
//   )
// }

// export default OrganizationDetailPage

import react from 'react'
import { EntityMetadata } from 'dvote-js'
// import { useTranslation } from 'react-i18next'
import { SummaryProcess } from '@vocdoni/react-hooks'

import { getVoteStatus } from '@lib/util'

import { Typography, TypographyVariant } from '@components/elements/typography'
import { Grid, Column } from '@components/elements/grid'
import { PageCard } from '@components/elements/cards'
import { CardImageHeader } from '@components/blocks/card/image-header'
import { DashboardProcessListItem } from '@components/pages/organizations/components/process-list-item'
// import { VOTING_PATH } from '@const/routes'
import i18n from '@i18n'


interface IEntityViewProps {
  address: string,
  metadata: EntityMetadata,
  processes: SummaryProcess[],
  blockHeight: number,
}
export const EntityView = ({ address, metadata, processes, blockHeight }: IEntityViewProps) => {
  // const { i18n } = useTranslation()
  const explorerUrl = `${process.env.EXPLORER_URL}/entity/${address}`

  return (
    <PageCard>
      <CardImageHeader
        title={metadata?.name.default}
        processImage={metadata?.media.header}
        // subtitle={entity?.name.default}
        entityImage={metadata.media.avatar}
      />

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{i18n.t('entity.home.entity_description')}</Typography>
          <Typography variant={TypographyVariant.Small}>{metadata.description.default}</Typography>
        </Column>
      </Grid>

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{i18n.t('entity.home.entity_address')} </Typography>
          <Typography variant={TypographyVariant.Small}>{address}<a href={explorerUrl} target='blank'>({i18n.t('entity.home.view_in_explorer')})</a></Typography>
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
                link={ 'VOTING_PATH' + "#/" + process.id }
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