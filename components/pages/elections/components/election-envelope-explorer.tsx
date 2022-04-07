import { Button } from '@components/elements/button'
import { Card } from '@components/elements/cards'
import { Grid } from '@components/elements/grid'
import {
  EnvelopeLink,
  TransactionLink,
} from '@components/pages/app/components/get-links'
import { useEnvelopesList } from '@hooks/use-envelopes'
import i18n from '@i18n'
import { ProcessResultsSingleChoice } from 'dvote-js'
import React, { useState } from 'react'

const ENVELOPES_PER_PAGE = 6

interface EnvelopeExplorerProps {
  results?: ProcessResultsSingleChoice
  processId: string
}

export const EnvelopeExplorer = ({
  results,
  processId,
}: EnvelopeExplorerProps) => {
  const [envelopePage, setEnvelopePage] = useState(0)
  const [from, setFrom] = useState(0)
  const { loadingEnvelopes, envelopeRange } = useEnvelopesList({
    processId,
    from,
    listSize: ENVELOPES_PER_PAGE,
  })

  const nextEnvelopeRange = () => {
    if ((envelopePage + 1) * ENVELOPES_PER_PAGE >= results.totalVotes) return
    setEnvelopePage(envelopePage + 1)
    setFrom((envelopePage + 1) * ENVELOPES_PER_PAGE)
  }
  const prevEnvelopeRange = () => {
    if (envelopePage <= 0) return
    setEnvelopePage(envelopePage - 1)
    setFrom((envelopePage - 1) * ENVELOPES_PER_PAGE)
  }

  return (
    <Card>
      <h4>
        {i18n.t('elections.envelopes')} ({results.totalVotes || 0})
      </h4>
      <div>
        <Button small disabled={loadingEnvelopes} onClick={prevEnvelopeRange}>
          {i18n.t('elections.back')}
        </Button>{' '}
        &nbsp;
        <Button small disabled={loadingEnvelopes} onClick={nextEnvelopeRange}>
          {i18n.t('elections.next')}
        </Button>{' '}
        &nbsp;
        <small>
          {i18n.t('elections.page')} {envelopePage + 1}/
          {Math.ceil(results.totalVotes / ENVELOPES_PER_PAGE)}
        </small>
      </div>

      <Grid>
        {envelopeRange.map((envelope, idx) => (
          <Card md={6} lg={4} xl={3} key={envelope.nullifier}>
            <strong>
              {i18n.t('elections.envelope_n', {
                number: envelopePage * ENVELOPES_PER_PAGE + idx + 1, // Is not showing tx index, instead show index of map itself
              })}
              {envelopePage * ENVELOPES_PER_PAGE + idx + 1}
            </strong>
            <p>
              {i18n.t('elections.envelope_on_block')}: {envelope.height || 0}
            </p>
            <p>
              {i18n.t('elections.tx_number')}: {envelope.tx_index || 0}
            </p>
            <p>
              <TransactionLink
                blockHeight={envelope.height.toString()}
                index={envelope.tx_index.toString()}
              >
                {i18n.t('elections.transaction_details')}
              </TransactionLink>
            </p>
            <p>
              <EnvelopeLink nullifier={envelope.nullifier}>
                {i18n.t('elections.envelope_details')}
              </EnvelopeLink>
            </p>
          </Card>
        ))}
      </Grid>
    </Card>
  )
}
