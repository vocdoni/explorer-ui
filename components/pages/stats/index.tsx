import React, { ReactNode } from 'react'
import styled from 'styled-components'
import {
  TextAlign,
  Typography,
  TypographyVariant,
} from '@components/elements/typography'
import { colors } from 'theme/colors'
import { Grid } from '@components/elements/grid'
import { Card, CardDiv } from '@components/elements/cards'
import { useEffect, useState } from 'react'

import { localizedDateDiff } from '@lib/date'
import { useTranslation } from 'react-i18next'
import { Stats } from '@lib/types'
import {
  Section,
  BlockContainer,
  CenterText,
} from '@components/elements/styled-divs'
import { BlockCard } from '@components/blocks/card/block-card'
import { useBlocks } from '@hooks/use-blocks'
import { capitalize } from '@lib/util'
import { MdSpeed } from 'react-icons/md'
import { VscGraphLine } from 'react-icons/vsc'

const BLOCK_LIST_SIZE = 4

const StatsPage = ({ stats }: { stats: Stats }) => {
  const { i18n } = useTranslation()

  const [blockHeight, setBlockHeight] = useState<number>()
  const { loading: loadingBlocks, recentBlocks } = useBlocks({
    from: blockHeight,
    listSize: BLOCK_LIST_SIZE,
    reverse: true,
  })

  useEffect(() => {
    if (stats && stats?.block_height !== blockHeight) {
      setBlockHeight(stats.block_height - BLOCK_LIST_SIZE)
    }
  }, [stats])

  const syncing = stats?.syncing
    ? i18n.t('stats.syncing')
    : i18n.t('stats.in_sync')

  return (
    <div>
      {/* <Section padding={'0'}>
        <BlockContainer>
          <Typography variant={TypographyVariant.H3} color={colors.blueText}>
            {i18n.t('stats.recent_blocks')}
          </Typography>
          <Typography variant={TypographyVariant.Small} color={colors.blueText}>
            {i18n.t('stats.the_last_four_blocks')}
          </Typography>

          <Grid>
            {recentBlocks.length ? (
              recentBlocks.map((item) => (
                <BlockCard
                  key={item.height}
                  proposerShrink={6}
                  blockData={item}
                  sm={6}
                  md={4}
                  lg={3}
                />
              ))
            ) : (
              <h3>{i18n.t('stats.getting_block_info')}</h3>
            )}
          </Grid>
        </BlockContainer>
      </Section> */}

      <Section>
        <BlockContainer>
          <Grid>
            <Card md={6}>
              <VerticallyCenter>
                <CardTitle
                  title={i18n.t('stats.latest_block')}
                  icon={<VscGraphLine />}
                ></CardTitle>
                {recentBlocks.length ? (
                  recentBlocks.map((item) => (
                    <BlockCard
                      key={item.height}
                      blockData={item}
                      style={{border: '1px solid #E4E7EB'}}
                    />
                  ))
                ) : (
                  <h3>{i18n.t('stats.getting_block_info')}</h3>
                )}
                <BlocksButton>skmsakm</BlocksButton>
              </VerticallyCenter>
            </Card>

            <Card md={6}>
              <VerticallyCenter>
                <CardTitle
                  title={i18n.t('stats.blockchain_info')}
                  icon={<MdSpeed />}
                ></CardTitle>
                <TitleSubtitle title={i18n.t('stats.network_id')}>
                  {capitalize(stats?.chain_id)}
                </TitleSubtitle>
                <TitleSubtitle title={i18n.t('stats.bloc_height')}>
                  {stats?.block_height}
                </TitleSubtitle>
                <TitleSubtitle title={i18n.t('stats.nr_of_validators')}>
                  {stats?.validator_count}
                </TitleSubtitle>

                <TitleSubtitle title={i18n.t('stats.sync_status')}>
                  {syncing}
                </TitleSubtitle>

                <TitleSubtitle title={i18n.t('stats.genesis_block_date')}>
                  {localizedDateDiff(new Date(stats?.genesis_time_stamp))}
                </TitleSubtitle>
              </VerticallyCenter>
            </Card>
          </Grid>
        </BlockContainer>
      </Section>
    </div>
  )
}

const CardTitle = ({ title, icon }: { title: string; icon: ReactNode }) => (
  <CardTitleWrapper>
    <Typography variant={TypographyVariant.H4} color={colors.text}>
      <TitleIcon>{icon}</TitleIcon>
      <strong>{title}</strong>
    </Typography>
  </CardTitleWrapper>
)

const CardTitleWrapper = styled.div`
  h4 {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }
`

const TitleIcon = styled.div`
  color: ${(props) => props.theme.textAccent1};
`

const TitleSubtitle = ({
  title,
  children,
}: {
  title: string
  children: string | number
}) => (
  <>
    <Title
    >
      <strong>{title}</strong>
    </Title>
    <Subtitle>{children}</Subtitle>
  </>
)

const Title = styled.h5`
  color: ${(props) => props.theme.blueText};
  margin: 30px 0px -3px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
`

const Subtitle = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
`

const ReadyTextContainer = styled.div`
  margin: 40px 0 40px 40px;
`

const ReadyToStartCard = styled(CardDiv)`
  background: linear-gradient(101.89deg, #f1ffdf 17.32%, #e1ffff 68.46%);
`

const VerticallyCenter = styled.div`
  margin: 30px 0;
  padding-left: 15px;
`




export const BlocksButton = styled.button`

  width: 160px;
height: 40px;
left: calc(50% - 160px/2);
top: 20px;

/* SECONDARY */
background: #46C4C2;
box-shadow: 0px 3px 3px rgba(180, 193, 228, 0.25);
border-radius: 8px;
`


export default StatsPage
