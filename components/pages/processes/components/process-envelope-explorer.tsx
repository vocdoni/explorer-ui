import { Card } from '@components/elements/cards'
import { Grid } from '@components/elements/grid'
import { useTranslation } from 'react-i18next'
import { ProcessResultsSingleChoice } from 'dvote-js'
import React, { useState } from 'react'
import { Paginator } from '@components/blocks/paginator'
import { Else, If, Then } from 'react-if'
import { renderCardSkeleton, EnvelopeCard } from '@components/blocks/card/envelope-card'
import { useElectionVotesCount, useElectionVotesList } from '@hooks/use-voconi-sdk'

const ENVELOPES_PER_PAGE = 10

interface EnvelopeExplorerProps {
  electionId: string
}

export const EnvelopeExplorer = ({
  electionId,
}: EnvelopeExplorerProps) => {
  const { i18n } = useTranslation()

  const [paginatorPage, setPaginatorPage] = useState(1)
  const votePage = paginatorPage -1

  const { loading: loadingEnvelopes, data: envelopeRange } = useElectionVotesList({
    electionId,
    page: votePage,
  })

  const {loading: voteCountLoading, data: envelopeCount } = useElectionVotesCount({ electionId })

  const loading = voteCountLoading || loadingEnvelopes

  const changePage = (page) => {
    setPaginatorPage(page)
  }

  return (
    <Card>
      <h4>
        {i18n.t('processes.envelope_explorer.total_votes', {
          totalVotes: envelopeCount?.count || 0,
        })}
      </h4>
      <Grid>
        <If
          condition={
            !loading && envelopeRange != null
          }
        >
          <Then>
            {envelopeRange?.map((envelope, idx) => (
              <EnvelopeCard
                envelope={envelope}
                idx={(votePage * ENVELOPES_PER_PAGE) + idx + 1}
                key={idx}
              ></EnvelopeCard>
            ))}
          </Then>
          <Else>
            {renderCardSkeleton(ENVELOPES_PER_PAGE)}
          </Else>
        </If>
      </Grid>

      {envelopeCount?.count > ENVELOPES_PER_PAGE &&
        <Paginator
          totalCount={envelopeCount?.count}
          pageSize={ENVELOPES_PER_PAGE}
          currentPage={paginatorPage}
          onPageChange={(page) => changePage(page)}
        ></Paginator>
      }

      {envelopeCount === null &&
        <Paginator
          pageSize={ENVELOPES_PER_PAGE}
          currentPage={paginatorPage}
          onPageChange={(page) => changePage(page)}
          disableGoLastBtn={true}
        ></Paginator>
      }

    </Card>
  )
}
