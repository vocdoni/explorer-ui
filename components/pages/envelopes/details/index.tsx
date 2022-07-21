import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { Card, PageCard } from '@components/elements/cards'
import { BadgeColumn, Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import {
  BlockLink,
  ProcessLink,
  TransactionLink,
} from '@components/pages/app/components/get-links'
import { useTranslation } from 'react-i18next'
import { Envelope, EnvelopeAll } from '@lib/types'
import { colors } from '@theme/colors'
import {
  BreakWordAll,
  ItemDate,
  OverflowScroll,
} from '@components/elements/styled-divs'
import { EncryptionKeysIndexesBadge } from '@components/blocks/badges/envelope_encryption_keys'
import { localizedDateDiff } from '@lib/date'
import { Tab, TabButton, Tabs } from '@components/blocks/tabs'
import { useState } from 'react'
import { Button } from '@components/elements/button'

export const EnvelopeDetails = ({ envelope }: { envelope: EnvelopeAll }) => {
  const { i18n } = useTranslation()

  const [showRawContent, setShowRawContent] = useState(false)

  return (
    <PageCard>
      <>
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.H3}>
              {i18n.t('envelopes.details.envelope_details')}
            </Typography>
            <Typography variant={TypographyVariant.H5}>
              <BreakWordAll>{envelope.meta.nullifier}</BreakWordAll>
            </Typography>
            <ItemDate>
              {i18n.t('envelopes.details.emitted')}{' '}
              {localizedDateDiff(new Date(envelope.timestamp * 1000))}
            </ItemDate>
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.encryption_keys_used')}:
              <BadgeColumn>
                {envelope.encryption_key_indexes?.length > 0 ? (
                  envelope.encryption_key_indexes.map((n) => {
                    return (
                      <EncryptionKeysIndexesBadge
                        key={n}
                        type={n}
                      ></EncryptionKeysIndexesBadge>
                    )
                  })
                ) : (
                  <EncryptionKeysIndexesBadge
                    type={null}
                  ></EncryptionKeysIndexesBadge>
                )}
              </BadgeColumn>
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.envelope_weight')}: {envelope.weight}
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.envelope_height')}: {envelope.height}
            </Typography>

            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.commited_in_block')}:
              <BlockLink blockHeight={envelope.meta.height}>
                <a>#{envelope.meta.height}</a>
              </BlockLink>
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.belongs_to_process')}
              {': '}
              <ProcessLink processId={envelope.meta.process_id}>
                <a>0x{envelope.meta.process_id}</a>
              </ProcessLink>
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.belongs_to_transaction')}
              {': '}
              <TransactionLink
                blockHeight={envelope.meta.height.toString()}
                index={envelope.meta.tx_index.toString()}
              >
                <a>0x{envelope.meta.tx_hash}</a>
              </TransactionLink>
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              {envelope.registered
                ? i18n.t('envelopes.details.envelope_is_registered')
                : i18n.t('envelopes.details.envelope_not_registered')}
            </Typography>
          </Column>
        </Grid>
        <Button
          small
          positive
          onClick={() => setShowRawContent(!showRawContent)}
        >
          {i18n.t('processes.details.see_raw_envelopment_content')}
        </Button>
        {showRawContent && (
          <Card>
            <h3>{i18n.t('transactions.details.raw_contents')}</h3>
            <OverflowScroll>{JSON.stringify(envelope, null, 2)}</OverflowScroll>
          </Card>
        )}
      </>
    </PageCard>
  )
}
