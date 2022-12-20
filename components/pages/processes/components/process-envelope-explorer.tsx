import { Card } from '@components/elements/cards'
import { Grid } from '@components/elements/grid'
import { useEnvelopesList } from '@hooks/use-envelopes'
import { useTranslation } from 'react-i18next'
import { ProcessResultsSingleChoice } from 'dvote-js'
import React, { useState } from 'react'
import { Paginator } from '@components/blocks/paginator'
import { Else, If, Then } from 'react-if'
import { renderCardSkeleton, EnvelopeCard } from '@components/blocks/card/envelope-card'

const ENVELOPES_PER_PAGE = 8

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
        {i18n.t('processes.envelope_explorer.total_votes', {
          totalVotes: results?.totalVotes || 0,
        })}
      </h4>
      <Grid>
        <If
          condition={
            !loadingEnvelopes
          }
        >
          <Then>
            {envelopeRange.map((envelope, idx) => (
              <EnvelopeCard
                envelope={envelope}
                idx={from + idx + 1}
                key={idx}
              ></EnvelopeCard>
            ))}
          </Then>
          <Else>
            {renderCardSkeleton(ENVELOPES_PER_PAGE)}
          </Else>
        </If>
      </Grid>

      {results?.totalVotes > ENVELOPES_PER_PAGE &&
        <Paginator
          totalCount={results.totalVotes}
          pageSize={ENVELOPES_PER_PAGE}
          currentPage={envelopePage}
          onPageChange={(page) => changePage(page)}
        ></Paginator>
      }

      {results === null &&
        <Paginator
          pageSize={ENVELOPES_PER_PAGE}
          currentPage={envelopePage}
          onPageChange={(page) => changePage(page)}
          disableGoLastBtn={true}
        ></Paginator>
      }

    </Card>
  )
}
