import React, { ReactNode } from 'react'
import styled from 'styled-components'
import {
  Typography,
  TypographyVariant,
} from '@components/elements/typography'
import { colors } from 'theme/colors'
import { Grid } from '@components/elements/grid'
import { Card } from '@components/elements/cards'
import { useEffect, useState } from 'react'

import { localizedDateDiff } from '@lib/date'
import { useTranslation } from 'react-i18next'
import { Stats } from '@lib/types'
import {
  Section,
  BlockContainer,

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
                <BlocksButton>{i18n.t('stats.view_all_blocks')}</BlocksButton>
              </VerticallyCenter>
            </Card>
            <Card md={6} >
              <VerticallyCenter>
                <CardTitle
                  title={i18n.t('stats.blockchain_info')}
                  icon={<MdSpeed />}
                ></CardTitle>
                <TitleSubtitleList>
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
                </TitleSubtitleList>
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
  <TitleSubtitleWrapper>
    <Title>
      <strong>{title}</strong>
    </Title>
    <Subtitle>{children}</Subtitle>
  </TitleSubtitleWrapper>
)

const TitleSubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px 0px;
  gap: 8px;
`

const Title = styled.h5`
  color: ${(props) => props.theme.blueText};
  margin: 30px 0px -3px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  margin: 0;
`

const Subtitle = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #7B8794;
  margin: 0;
`

const VerticallyCenter = styled.div`
  margin: 30px 0;
  padding-left: 15px;
  min-height: 485px;
`

const TitleSubtitleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

`

export const BlocksButton = styled.button`
  left: calc(50% - 160px/2);
  top: 20px;
  padding: 12px 24px;

  /* SECONDARY */
  background: #46C4C2;
  box-shadow: 0px 3px 3px rgba(180, 193, 228, 0.25);
  border-radius: 8px;
  color: white;
  border: none;

  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;

  &:hover, &:active {
    background: #0D4752;
    box-shadow: 0px 3px 3px rgba(180, 193, 228, 0.25);
  }
`


export default StatsPage
