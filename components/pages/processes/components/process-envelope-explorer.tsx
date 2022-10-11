import { Button } from '@components/elements/button'
import { Card } from '@components/elements/cards'
import { Grid } from '@components/elements/grid'
import {
  EnvelopeLink,
  TransactionLink,
} from '@components/pages/app/components/get-links'
import { useEnvelopesList } from '@hooks/use-envelopes'
import { useTranslation } from 'react-i18next'
import { ProcessResultsSingleChoice } from 'dvote-js'
import React, { useState } from 'react'
import { FakedButton } from '@components/elements/styled-divs'
import { Paginator } from '@components/blocks/paginator'

const ENVELOPES_PER_PAGE = 6

interface EnvelopeExplorerProps {
  results?: ProcessResultsSingleChoice
  processId: string
}

export const EnvelopeExplorer = ({
  results,
  processId,
}: EnvelopeExplorerProps) => {
  const { i18n } = useTranslation()

  const [envelopePage, setEnvelopePage] = useState(1)
  const [from, setFrom] = useState(0)
  const { loadingEnvelopes, envelopeRange } = useEnvelopesList({
    processId,
    from,
    listSize: ENVELOPES_PER_PAGE,
  })

  const changePage = (page) => {
    setEnvelopePage(page)
    setFrom((page - 1) * ENVELOPES_PER_PAGE)
  }

  return (
    <Card>
      <h4>
        {i18n.t('processes.envelope_explorer.total_votes', {totalVotes: results.totalVotes || 0 } )}
      </h4>

      <Grid>
        {envelopeRange.map((envelope, idx) => (
          <Card md={6} lg={4} xl={3} key={envelope.nullifier}>
            <strong>
              {i18n.t('processes.envelope_explorer.envelope_n', {
                number: from + idx + 1, // Is not showing tx index, instead show index of map itself
              })}
            </strong>
            <p>
              {i18n.t('processes.envelope_explorer.envelope_on_block', {block: envelope.height || 0})}
            </p>
            <p>
              {i18n.t('processes.envelope_explorer.tx_number',  {txNumber: envelope.tx_index || 0})}
            </p>
            <p>
              <TransactionLink
                blockHeight={envelope.height.toString()}
                index={envelope.tx_index.toString()}
              >
                {i18n.t('processes.envelope_explorer.transaction_details')}
              </TransactionLink>
            </p>
            <p>
              <EnvelopeLink nullifier={envelope.nullifier}>
                {i18n.t('processes.envelope_explorer.envelope_details')}
              </EnvelopeLink>
            </p>
          </Card>
        ))}
      </Grid>

      {results.totalVotes > ENVELOPES_PER_PAGE && 
        <Paginator
          totalCount={results.totalVotes}
          pageSize={ENVELOPES_PER_PAGE}
          currentPage={envelopePage}
          onPageChange={(page) => changePage(page)}
        ></Paginator>
      }
    </Card>
  )
}
