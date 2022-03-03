import React from 'react'
import styled from 'styled-components'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { colors } from 'theme/colors'
import { Grid } from '@components/elements/grid'
import { HeroBanner } from '@components/pages/home/components/hero-banner'
import { Card, CardDiv } from '@components/elements/cards'

import { localizedDateDiff } from '@lib/date'
import i18n from '@i18n'
import { Stats, BlockInfo } from '@lib/types'
import { Section, BlockContainer } from '@components/elements/styled-divs'

const StatsPage = ({
  stats,
  recentBlocks,
}: {
  stats: Stats
  recentBlocks: BlockInfo[]
}) => {
  return (
    <div>
      <HeroBanner
        elections={stats?.process_count}
        organizations={stats?.entity_count}
        averageBlockTime={(stats?.block_time[0] || 0) / 1000}
        envelopes={stats?.envelope_count}
      />

      <Section>
        <BlockContainer>
          <Typography variant={TypographyVariant.H3} color={colors.blueText}>
            {i18n.t('home.recent_blocks')}
          </Typography>
          <Typography variant={TypographyVariant.Small} color={colors.blueText}>
            {i18n.t('home.the_last_four_blocks')}
          </Typography>

          <Grid>
            {recentBlocks.map((item) => (
              <Card sm={6} md={4} lg={3} key={item.height}>
                <h4>
                  {i18n.t('home.block')} {item.height}
                </h4>
                <p>
                  <small>{localizedDateDiff(new Date(item.timestamp))}</small>
                </p>
                <p>
                  {i18n.t('home.transactions')}: {item.num_txs}
                </p>
                <p>
                  {i18n.t('home.proposer')}:{' '}
                  <code>0x{item.proposer_address.substr(0, 6)}...</code>
                </p>
              </Card>
            ))}
          </Grid>
        </BlockContainer>
      </Section>

      <Section>
        <BlockContainer>
          <Typography variant={TypographyVariant.H3} color={colors.blueText}>
            {i18n.t('home.blockchain_info')}
          </Typography>
          <Typography variant={TypographyVariant.Small} color={colors.blueText}>
            {i18n.t('home.network_details')}
          </Typography>

          <Grid>
            <Card md={6}>
              <h5>{i18n.t('home.network_id')}</h5>
              <p>{stats?.chain_id}</p>
              <h5>{i18n.t('home.bloc_height')}</h5>
              <p>{stats?.block_height}</p>
              <h5>{i18n.t('home.total_transactions')}</h5>
              <p>{stats?.transaction_count}</p>
              <h5>{i18n.t('home.total_elections')}</h5>
              <p>{stats?.process_count}</p>
              <h5>{i18n.t('home.total_votes')}</h5>
              <p>{stats?.envelope_count}</p>
            </Card>
            <Card md={6}>
              <h5>{i18n.t('home.genesis_block_date')}</h5>
              <p>{localizedDateDiff(new Date(stats?.genesis_time_stamp))}</p>
              <h5>{i18n.t('home.latest_block_date')}</h5>
              <p>{localizedDateDiff(new Date(recentBlocks[0]?.timestamp))}</p>
              <h5>{i18n.t('home.total_organizations')}</h5>
              <p>{stats?.entity_count}</p>
              <h5>{i18n.t('home.number_of_validators')}</h5>
              <p>{stats?.validator_count}</p>
              <h5>{i18n.t('home.sync_status')}</h5>
              <p>
                {stats?.    syncing
                  ? i18n.t('home.syncing')
                  : i18n.t('home.in_sync')}
              </p>
            </Card>
          </Grid>
        </BlockContainer>
      </Section>
    </div>
  )
}

const ReadyTextContainer = styled.div`
  margin: 40px 0 40px 40px;
`

const ReadyToStartCard = styled(CardDiv)`
  background: linear-gradient(101.89deg, #f1ffdf 17.32%, #e1ffff 68.46%);
`

export default StatsPage
