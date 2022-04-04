import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { ELECTIONS_DETAILS, TRANSACTIONS_DETAILS } from '@const/routes'
import i18n from '@i18n'
import { localizedDateDiff } from '@lib/date'
import RouterService from '@lib/router'
import { Envelope, GetTx } from '@lib/types'
import { colors } from '@theme/colors'
import Link from 'next/link'

const envelope_mock = {
  encryption_key_indexes: null,
  meta: {
    height: 357,
    nullifier: 'hexString',
    process_id: 'hexString',
    tx_hash: 'hexString',
    tx_index: 0,
  },
  nonce: 'hexString',
  signature: 'hexString',
  vote_package: 'base64String',
  weight: '1',
}

export const EnvelopeDetails = ({ envelope }: { envelope: Envelope }) => {
  return (
    <PageCard>
      <>
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.H3}>
              {i18n.t('envelope.envelope_details')}
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              <span>
                {i18n.t('envelope.nullifier')}:{envelope_mock.meta.nullifier}
              </span>
            </Typography>

            <Typography
              variant={TypographyVariant.Small}
              color={colors.lightText}
            >
              {i18n.t('envelope.envelope_weight')}
              {envelope_mock.weight}
            </Typography>
          </Column>
        </Grid>
        <GenericListItemWithBadge
          topLeft={
            <>
              {i18n.t('envelope.block_height')}
              {envelope_mock.meta.height}
            </>
          }
          badge={<></>}
          dateText={i18n.t('envelope.vote_package') + envelope_mock.vote_package}
          link={null}
          title={i18n.t('envelopes.nonce') + '0x' + envelope_mock?.nonce}
        >
          <p>
            {i18n.t('envelopes.process_id')}:{/* todo(ritmo): DRY */}
            <Link
              href={RouterService.instance.get(ELECTIONS_DETAILS, {
                electionsId: envelope_mock.meta.process_id,
              })}
            >
              <a>0x{envelope_mock.meta.process_id}</a>
            </Link>
          </p>
          <p>
            {i18n.t('envelopes.tx_id')}:{/* todo(ritmo): DRY */}
            <Link
              href={RouterService.instance.get(TRANSACTIONS_DETAILS, {
                blockHeight: envelope_mock.meta.height.toString(),
                index: envelope_mock.meta.tx_index.toString(),
              })}
            >
              <a>0x{envelope_mock.meta.tx_hash}</a>
            </Link>
          </p>
        </GenericListItemWithBadge>
      </>
    </PageCard>
  )
}
