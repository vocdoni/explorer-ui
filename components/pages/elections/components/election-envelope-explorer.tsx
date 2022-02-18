import { Button } from '@components/elements/button'
import { Card } from '@components/elements/cards'
import { Grid } from '@components/elements/grid'
import { EnvelopeLink } from '@components/pages/app/components/envelopes'
import i18n from '@i18n'
import { usePool } from '@vocdoni/react-hooks'
import { ProcessResultsSingleChoice, VotingApi } from 'dvote-js'
import React, { useEffect, useState } from 'react'

const ENVELOPES_PER_PAGE = 6

type EnvelopeList = Awaited<ReturnType<typeof VotingApi.getEnvelopeList>>

interface EnvelopeExplorerProps {
  results?: ProcessResultsSingleChoice
  processId: string
}

export const EnvelopeExplorer = ({
  results,
  processId,
}: EnvelopeExplorerProps) => {
  const [envelopePage, setEnvelopePage] = useState(0)
  const [envelopeRange, setEnvelopeRange] = useState<EnvelopeList>([])
  const [loadingEnvelopes, setLoadingEnvelopes] = useState(false)
  const { poolPromise } = usePool()

  // Election Envelopes
  useEffect(() => {
    setLoadingEnvelopes(true)

    poolPromise
      .then((pool) =>
        VotingApi.getEnvelopeList(
          processId,
          envelopePage * ENVELOPES_PER_PAGE,
          ENVELOPES_PER_PAGE,
          pool
        )
      )
      .then((envelopes) => {
        setLoadingEnvelopes(false)
        setEnvelopeRange(envelopes)

        console.debug('DEBUG:', 'envelopes', envelopes)
      })
      .catch((err) => {
        setLoadingEnvelopes(false)

        console.error(err)
      })
  }, [envelopePage, poolPromise, processId])

  const nextEnvelopeRange = () => {
    if ((envelopePage + 1) * ENVELOPES_PER_PAGE >= results.totalVotes) return
    setEnvelopePage(envelopePage + 1)
  }
  const prevEnvelopeRange = () => {
    if (envelopePage <= 0) return
    setEnvelopePage(envelopePage - 1)
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
                number: envelopePage * ENVELOPES_PER_PAGE + idx + 1,
              })}
            </strong>
            {/* <p>
              {i18n.t('elections.block')}: {envelope.height || 0}
            </p> */}
            <p> 
              <EnvelopeLink envelopId={envelope.tx_hash}>
                {i18n.t('elections.transaction_details')}
              </EnvelopeLink>
            </p>
          </Card>
        ))}
      </Grid>
    </Card>
  )
}
