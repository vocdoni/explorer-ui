import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import {
  ProcessLink,
  TransactionLink,
} from '@components/pages/app/components/get-links'
import { useTranslation } from 'react-i18next'
import { Envelope } from '@lib/types'
import { colors } from '@theme/colors'
import { BreakWordAll } from '@components/elements/styled-divs'

export const EnvelopeDetails = ({ envelope }: { envelope: Envelope }) => {
  const { i18n } = useTranslation()
  return (
    <PageCard>
      <>
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.H3}>
              {i18n.t('envelopes.details.envelope_details')}
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              <BreakWordAll>
                {i18n.t('envelopes.details.nullifier')}: {envelope.meta.nullifier}
              </BreakWordAll>
            </Typography>

            <Typography
              variant={TypographyVariant.Small}
            >
              {i18n.t('envelopes.details.envelope_weight')} {envelope.weight}
            </Typography>
          </Column>
        </Grid>
        <GenericListItemWithBadge
          topLeft={
            <>
              {i18n.t('envelopes.details.block_height')} {envelope.meta.height}
            </>
          }
          badge={<></>}
          dateText={
            i18n.t('envelopes.details.vote_package') + ': ' + envelope.vote_package
          }
          link={null}
          title={i18n.t('envelopes.nonce') + ' 0x' + envelope?.nonce}
        >
          <p>
            {i18n.t('envelopes.details.process_id')}{': '}
            <ProcessLink processId={envelope.meta.process_id}>
              <a>0x{envelope.meta.process_id}</a>
            </ProcessLink>
          </p>
          <p>
            {i18n.t('envelopes.details.tx_id')}{': '}
            <TransactionLink
              blockHeight={envelope.meta.height.toString()}
              index={envelope.meta.tx_index.toString()}
            >
              <a>0x{envelope.meta.tx_hash}</a>
            </TransactionLink>
          </p>
        </GenericListItemWithBadge>
      </>
    </PageCard>
  )
}
