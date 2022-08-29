import { Card, PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Input } from '@components/elements/inputs'
import { MainDescription, SectionTitle } from '@components/elements/text'
import { Typography, TypographyVariant } from '@components/elements/typography'
import {
  useBlockAtDate,
  useBlockHeight,
  useDateAtBlock,
} from '@vocdoni/react-hooks'
import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import DateTimePicker from 'react-rainbow-components/components/DateTimePicker'
import {
  FlexContainer,
  FlexDirection,
  FlexJustifyContent,
} from '@components/elements/flex'
import { useTranslation } from 'react-i18next'
import { useStats } from '@hooks/use-stats'
import { localizedDateDiff } from '@lib/date'



const BlocksPage = () => {
  const { i18n } = useTranslation()

  const { blockHeight } = useBlockHeight()

  const [blockInput, setBlockInput] = useState<number>()
  const [dateInput, setDateInput] = useState<Date>(new Date())

  const [targetBlock, setTargetBlock] = useState<number>()
  const [targetDate, setTargetDate] = useState<Date>()

  const { date, loading, error } = useDateAtBlock(targetBlock)
  const { blockHeight: estimatedBlockNumber } = useBlockAtDate(targetDate)

  const [genesisDate, setGenesisDate] = useState<Date>()
  const { loading: loadingStats, stats } = useStats({})

  useEffect(() => {
    if (blockInput !== targetBlock) {
      setTargetDate(null)
      setTargetBlock(blockInput)
    }
  }, [blockInput])

  useEffect(() => {
    if (dateInput !== targetDate) {
      setTargetBlock(null)
      setTargetDate(dateInput)
    }
  }, [dateInput])

  useEffect(() => {
    if(stats) setGenesisDate(new Date(stats.genesis_time_stamp))
  }, [stats])

  const enviormentName = (env) => {
    switch(env) {
      case 'prod':
        return 'production';
      case 'dev':
        return 'development';
      default:
        return env;
    }
  }


  return (
    <PageCard>
      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.H1}>
            {i18n.t('converter.date_block_estimation')}
          </Typography>
          <MainDescription>
            {i18n.t('converter.conversion_between_block_and_dates')}
          </MainDescription>
          <p>
            {i18n.t('converter.current_enviorment')} {': '}
            <strong>{enviormentName(process.env.VOCDONI_ENVIRONMENT)}</strong>
          </p>
          <p>
            {i18n.t('converter.genesis_date')} {': '}
            {localizedDateDiff(genesisDate)}
          </p>
          <p>
            {i18n.t('converter.block_height')} {': '} {blockHeight}
          </p>
        </Column>
        <Column md={4} sm={6}>
          <InputTitle>{i18n.t('converter.set_date')}</InputTitle>
          <CalendarContainer>
            <DateTimePicker
              id={'datetimeid'}
              minDate={genesisDate}
              value={targetDate ?? date ?? new Date()}
              // value={targetDate}
              onChange={(value) => setDateInput(value)}
              hour24
            />
          </CalendarContainer>
        </Column>
        <Column md={2}>
          <FlexContainer
            direction={FlexDirection.Column}
            justify={FlexJustifyContent.End}
          >
            <MiddleCardContainer>
              <Card>
                <FlexContainer justify={FlexJustifyContent.Center}>
                  <>{'<>'}</>
                </FlexContainer>
              </Card>
            </MiddleCardContainer>
          </FlexContainer>
        </Column>
        <Column md={4} sm={6}>
          <InputTitle>{i18n.t('converter.set_block')}</InputTitle>
          <Input
            placeholder={i18n.t('converter.search_by_block_height')}
            value={targetBlock ?? estimatedBlockNumber ?? ''}
            onChange={(ev) => {
              setBlockInput(+ev.target.value)
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
        </Column>
      </Grid>

      <LoadingContainer>
        {loading ? (
          <MainDescription>
            {i18n.t('converter.loading_info')}
          </MainDescription>
        ) : null}
      </LoadingContainer>
    </PageCard>
  )
}

export default BlocksPage

const LoadingContainer = styled.div`
  height: 20px;
`

const CalendarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-right: 16px;
  margin-top: 8px;
`
const InputTitle = styled(SectionTitle)`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.blueText};
`
const MiddleCardContainer = styled(SectionTitle)``
