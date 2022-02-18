import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import { GatewayPool } from "dvote-js"

// import { Button } from '../components/elements/button'
// import { } from '@const/routes'
import { usePool } from '@vocdoni/react-hooks'
import { useAlertMessage } from '@hooks/message-alert'
import {
  TextAlign,
  Typography,
  TypographyVariant,
} from '@components/elements/typography'
import { colors } from 'theme/colors'
import { FlexAlignItem } from '@components/elements/flex'
import { ImageContainer } from '@components/elements/images'
import { Grid, Column } from '@components/elements/grid'
import { FeatureSection } from '@components/pages/home/components/feature'
import { HeroBanner } from '@components/pages/home/components/hero-banner'
import { Card, CardDiv } from '@components/elements/cards'
import { EmptyProviders } from '@components/pages/app/providers/empty-providers'

import { sizes } from 'theme/sizes'
import { localizedDateDiff } from '@lib/date'

type Stats = {
  block_height: number,
  block_time: [number, number, number, number, number],
  block_time_stamp: number,
  chain_id: string,
  entity_count: number,
  envelope_count: number,
  genesis_time_stamp: string,
  process_count: number,
  syncing: boolean,
  transaction_count: number,
  validator_count: number
}
type BlockInfo = {
  hash: string
  height: number,
  last_block_hash: string
  num_txs: number,
  proposer_address: string
  timestamp: string
}

// TODO: REMOVE
const TEMP_DEFAULT_STATS: Stats = {
  "block_height": 774869,
  "block_time": [
    12000,
    12000,
    11881,
    11894,
    11895
  ],
  "block_time_stamp": 1630064649,
  "chain_id": "vocdoni-release-1.0.1",
  "entity_count": 126,
  "envelope_count": 5229,
  "genesis_time_stamp": "2021-05-12T12:38:33.672114557Z",
  "process_count": 317,
  "syncing": false,
  "transaction_count": 1242,
  "validator_count": 5
}
const TEMP_DEFAULT_BLOCK_INFO = {
  hash: "cc7b3b554ebb1dc73112894125d7820797412bff830e7d979be9e159f5eaeef6",
  height: 774859,
  last_block_hash: "910df480ab6a79edcdbc51ef8b32c5357f8b48669aabfbac35cec3f761561588",
  num_txs: 0,
  proposer_address: "71aa2fefa96447bc5aef9fd928f3f8ed57e695cf",
  timestamp: "2021-08-27T11:42:10.033766696Z"
}

const REFRSH_TIME = 15 * 1000

// MAIN COMPONENT
const IndexPage = () => {
  // const { i18n } = useTranslation()
  const [stats, setStats] = useState<Stats>(TEMP_DEFAULT_STATS as any)
  const [recentBlocks, setRecentBlocks] = useState<Array<BlockInfo>>([TEMP_DEFAULT_BLOCK_INFO, TEMP_DEFAULT_BLOCK_INFO, TEMP_DEFAULT_BLOCK_INFO, TEMP_DEFAULT_BLOCK_INFO])
  const [loading, setLoading] = useState(false)
  const { poolPromise } = usePool()
  const { setAlertMessage } = useAlertMessage()

  useEffect(() => {
    // const itv = setInterval(() => loadStats(), REFRSH_TIME)
    loadStats()

    // return () => clearInterval(itv)
  }, [poolPromise])

  // Fetch data
  const loadStats = () => {
    if (loading || !poolPromise) return

    setLoading(true)

    let gwPool: GatewayPool

    poolPromise
      .then(pool => {
        gwPool = pool
        return gwPool.sendRequest({ method: "getStats" } as any)
      })
      .then(response => {
        if (!response?.stats) throw new Error("Empty stats")
        setStats(response.stats)

        return gwPool.sendRequest({ method: "getBlockList" } as any)
      })
      .then(response => {
        if (!response?.blockList) throw new Error("Empty block list")
        setRecentBlocks(response.blockList || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  return (
    <div>
      <HeroBanner
        elections={stats.process_count}
        organizations={stats.entity_count}
        averageBlockTime={(stats.block_time[0] || 0) / 1000}
        envelopes={stats.envelope_count}
      />

      <Section>
        <BlockContainer>
          <Typography
            variant={TypographyVariant.H3}
            color={colors.blueText}
          >
            {i18n.t('home.recent_blocks')}
          </Typography>
          <Typography
            variant={TypographyVariant.Small}
            color={colors.blueText}
          >
            {i18n.t('home.the_last_four_blocks')}
          </Typography>

          <div>aaaaa</div>

          {/* <Grid>
            {recentBlocks.map(item => (
              <Card sm={6} md={4} lg={3} key={item.height}>
                <h4>{i18n.t("home.block")} {item.height}</h4>
                <p><small>{localizedDateDiff(new Date(item.timestamp))}</small></p>
                <p>{i18n.t("home.transactions")}: {item.num_txs}</p>
                <p>{i18n.t("home.proposer")}: <code>0x{item.proposer_address.substr(0, 6)}...</code></p>
              </Card>
            ))}
          </Grid> */}

        </BlockContainer>
      </Section>

      <Section>
        <BlockContainer>

          <Typography
            variant={TypographyVariant.H3}
            color={colors.blueText}
          >
            {i18n.t('home.blockchain_info')}
          </Typography>
          <Typography
            variant={TypographyVariant.Small}
            color={colors.blueText}
          >
            {i18n.t('home.network_details')}
          </Typography>

          <Grid>
            <Card md={6}>
              <h5>{i18n.t("home.network_id")}</h5>
              <p>{stats.chain_id}</p>
              <h5>{i18n.t("home.bloc_height")}</h5>
              <p>{stats.block_height}</p>
              <h5>{i18n.t("home.total_transactions")}</h5>
              <p>{stats.transaction_count}</p>
              <h5>{i18n.t("home.total_elections")}</h5>
              <p>{stats.process_count}</p>
              <h5>{i18n.t("home.total_votes")}</h5>
              <p>{stats.envelope_count}</p>
            </Card>
            <Card md={6}>
              <h5>{i18n.t("home.genesis_block_date")}</h5>
              <p>{localizedDateDiff(new Date(stats.genesis_time_stamp))}</p>
              <h5>{i18n.t("home.latest_block_date")}</h5>
              <p>{localizedDateDiff(new Date(recentBlocks[0]?.timestamp))}</p>
              <h5>{i18n.t("home.total_organizations")}</h5>
              <p>{stats.entity_count}</p>
              <h5>{i18n.t("home.number_of_validators")}</h5>
              <p>{stats.validator_count}</p>
              <h5>{i18n.t("home.sync_status")}</h5>
              <p>{stats.syncing ? i18n.t("home.syncing") : i18n.t("home.in_sync")}</p>
            </Card>
          </Grid>
        </BlockContainer>
      </Section>

      <Section background='#FEFEFF'>
        <BlockContainer>
          <Grid>
            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('home.get_instant_results')}
                subtitle={i18n.t(
                  'home.you_and_your_social_base_will_be_able_to_se_the_results'
                )}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/home/features/instant.png"
                      alt={i18n.t('home.instant_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>

            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('home.choose_the_time_frame')}
                subtitle={i18n.t('home.you_cant_set_the_start_and_end_dates')}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/home/features/time-frame.png"
                      alt={i18n.t('home.time_frame_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>

            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('home.notify_your_community')}
                subtitle={i18n.t(
                  'home.all_you_have_to_do_is_email_entire_social_base'
                )}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/home/features/notify.png"
                      alt={i18n.t('home.notify_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>

            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('home.all_in_one_solution')}
                subtitle={i18n.t(
                  'home.the_voting_process_includes_all_the_requirements_for_your_voting_process'
                )}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/home/features/all-in-one.png"
                      alt={i18n.t('home.all_in_one_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>
          </Grid>
        </BlockContainer>
      </Section>

      <Section background='linear-gradient(101.89deg, #F1FFDF 17.32%, #E1FFFF 68.46%);'>
        <BlockContainer>
          <Grid>
            <Column sm={12} md={6}>
              <Typography
                variant={TypographyVariant.H1}
              >
                {i18n.t('home.a_cutting_edge_voting_protocol')}
              </Typography>
              <Typography
                variant={TypographyVariant.Small}
              >
                {i18n.t(
                  'home.a_fully_anonymous_voting_system_ensuring_data_availability'
                )}
              </Typography>
              <Typography
                variant={TypographyVariant.Small}
              >
                {i18n.t('home.leveraging_on_decentalized_technologies')}
              </Typography>
              <CuttingEdgeFeaturesContainer>
                <ImageContainer width="50px">
                  <img
                    src="/images/home/cutting-edge/censorship.png"
                    alt={i18n.t('home.censorship_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="60px">
                  <img
                    src="/images/home/cutting-edge/verifiable.png"
                    alt={i18n.t('home.verifiable_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="70px">
                  <img
                    src="/images/home/cutting-edge/open-source.png"
                    alt={i18n.t('home.open_source_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="44px">
                  <img
                    src="/images/home/cutting-edge/scalable.png"
                    alt={i18n.t('home.scalable_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="56px">
                  <img
                    src="/images/home/cutting-edge/anonymous.png"
                    alt={i18n.t('home.anonymous_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="58px">
                  <img
                    src="/images/home/cutting-edge/inexpensive.png"
                    alt={i18n.t('home.inexpensive_image_alt')}
                  />
                </ImageContainer>
              </CuttingEdgeFeaturesContainer>
            </Column>

            <Column sm={12} md={6}>
              <ImageContainer width="400px" alignItem={FlexAlignItem.Center}>
                <img
                  src="/images/home/cutting-edge/edge-protocol.png"
                  alt={i18n.t('home.edge_protocol_image_alt')}
                />
              </ImageContainer>
            </Column>
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

const Section = styled.section<{ background?: string }>`
  padding: 30px 0;
  ${({ background }) => background ? `background: ${background};` : ''}
`

const BlockContainer = styled.div`
  max-width: ${sizes.laptopL * 0.8}px;
  margin: auto;
  padding: 0 15px;
`


const CuttingEdgeFeaturesContainer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: start;

  & > div {
    margin-right: 20px;
  }
`
export default IndexPage
