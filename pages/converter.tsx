import { Card, PageCard } from '@components/elements/cards';
import { Column, Grid } from '@components/elements/grid';
import { IInputProps, Input } from '@components/elements/inputs';
import { MainDescription, SectionTitle, StrongAndText } from '@components/elements/text';
import { Typography, TypographyVariant } from '@components/elements/typography';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexAlignItem, FlexContainer, FlexDirection, FlexJustifyContent } from '@components/elements/flex';
import { useTranslation } from 'react-i18next';
import { localizedDateDiff } from '@lib/date';
import { capitalize } from '@lib/util';

import { FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp } from 'react-icons/fi';
import { useIsMobile } from '@hooks/use-window-size';
import DateTimePicker from '@components/elements/date-picker';
import { useBlockHeight, useBlockToDate, useChainInfo, useDateToBlock } from '@hooks/use-voconi-sdk';

const BlocksPage = () => {
  const { i18n } = useTranslation();

  const { blockHeight } = useBlockHeight();

  const [blockInput, setBlockInput] = useState<number>();
  const [dateInput, setDateInput] = useState<Date>(new Date());

  const [targetBlock, setTargetBlock] = useState<number>();
  const [targetDate, setTargetDate] = useState<Date>();

  const { data: blockHeightData, loading } = useDateToBlock({ date: targetDate ?? new Date() });
  const estimatedBlockNumber = blockHeightData?.height ?? 1;

  const { data: dateData } = useBlockToDate({ height: targetBlock ?? 0 });
  let date: Date;
  if (dateData?.date) date = new Date(dateData?.date);

  const { data: stats, loading: loadingStats } = useChainInfo();
  const genesisDate = stats ? new Date(stats?.genesisTime) : null;

  const isMobile = useIsMobile();

  useEffect(() => {
    if (blockInput !== targetBlock) {
      setTargetDate(null);
      setTargetBlock(blockInput);
    }
  }, [blockInput]);

  useEffect(() => {
    if (dateInput !== targetDate) {
      setTargetBlock(null);
      setTargetDate(dateInput);
    }
  }, [dateInput]);

  const enviormentName = (env) => {
    switch (env) {
      case 'prod':
        return 'production';
      case 'dev':
        return 'development';
      default:
        return env;
    }
  };

  const ChevronPhone = () => (
    <ChevronPhoneWrapper>
      <FiChevronUp />
      <FiChevronDown />
    </ChevronPhoneWrapper>
  );

  const Chevron = () => (
    <>
      <FiChevronLeft />
      <FiChevronRight />
    </>
  );
  console.log('AAAAXXXX');
  return (
    <PageCard>
      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.H1}>{i18n.t('converter.date_block_estimation')}</Typography>
          <MainDescription>
            {i18n.t('converter.calculate_the_conversion_between_Vochain_blocks_and_dates')}
          </MainDescription>
          <div>
            <StrongAndText title={i18n.t('converter.current_enviorment') + ': '}>
              {capitalize(enviormentName(process.env.VOCDONI_ENVIRONMENT))}
            </StrongAndText>
          </div>
          <div>
            <StrongAndText title={i18n.t('converter.genesis_date') + ': '}>
              {!loadingStats && localizedDateDiff(genesisDate)}
            </StrongAndText>
          </div>
          <div>
            <StrongAndText title={i18n.t('converter.block_height') + ': '}>{blockHeight}</StrongAndText>
          </div>
        </Column>
        <ConversorWrapper>
          {/* <Column md={4} sm={6}> */}
          <Column md={4} sm={6}>
            <InputTitle>{i18n.t('converter.set_date')}</InputTitle>
            <CalendarContainer>
              <DateTimePicker
                id={'datetimeid'}
                minDate={genesisDate}
                value={targetDate ?? date ?? new Date()}
                onChange={(value) => setDateInput(value)}
                required={true}
              />
            </CalendarContainer>
          </Column>
          <ColumnBottomAligned md={2}>
            <FlexContainer
              direction={FlexDirection.Column}
              justify={FlexJustifyContent.Center}
              alignItem={FlexAlignItem.Center}
            >
              <InputTitle></InputTitle>
              <MiddleCardContainer>
                <Card>
                  <FlexContainer height={'25px'} justify={FlexJustifyContent.Center} alignItem={FlexAlignItem.Center}>
                    {isMobile ? <ChevronPhone /> : <Chevron />}
                  </FlexContainer>
                </Card>
              </MiddleCardContainer>
            </FlexContainer>
          </ColumnBottomAligned>
          <Column md={4} sm={6}>
            <InputTitle>{i18n.t('converter.set_block')}</InputTitle>
            <CalendarContainer>
              <Input
                placeholder={i18n.t('converter.search_by_block_height')}
                value={targetBlock ?? estimatedBlockNumber ?? ''}
                onChange={(ev) => {
                  setBlockInput(+ev.target.value);
                }}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </CalendarContainer>
          </Column>
        </ConversorWrapper>
      </Grid>

      <LoadingContainer>
        {loading ? <MainDescription>{i18n.t('converter.loading_info')}</MainDescription> : null}
      </LoadingContainer>
    </PageCard>
  );
};

export default BlocksPage;

const ColumnBottomAligned = styled(Column)`
   {
    justify-content: flex-end;
    flex-direction: column;
    display: flex;
  }
`;

const LoadingContainer = styled.div`
  height: 20px;
`;

const CalendarContainer = styled.div<IInputProps>`
  display: flex;
  flex-wrap: wrap;

  margin-right: 16px;
  margin-top: 8px;

  svg {
    display: none;
  }

  input {
    padding: ${({ type }) => (type == 'color' ? '0px' : '11px')};
    margin-top: 8px;
    color: ${({ error, theme }) => (error ? '#FF2929' : theme.blueText)};
    border: 2px solid ${({ error }) => (error ? '#FF2929' : '#EFF1F7;')};
    box-shadow: ${({ error }) =>
      error ? 'inset 0px 2px 3px rgba(180, 193, 228, 0.35)' : 'inset 0px 2px 3px rgba(180, 193, 228, 0.35)'};
    box-sizing: border-box;
    border-radius: 8px;
    outline-width: 0;
    margin-bottom: 10px;
    ${({ wide }) => (wide ? 'width: 100%;' : '')}
    ${({ type }) => (type == 'color' ? 'height: 40px' : '')};

    @media ${({ theme }) => theme.screenMax.mobileL} {
      padding: 11px 16px;
      line-height: 22px;
      font-size: 16px;
    }
  }
`;
const InputTitle = styled(SectionTitle)`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.blueText};
`;
// const MiddleCardContainer = styled(SectionText)``
const MiddleCardContainer = styled.div``;

const ChevronPhoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConversorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 40px 24px;
  gap: 24px;

  background: #f5f7fa;
  border-radius: 12px;

  @media ${({ theme }) => theme.screenMax.mobileL} {
    flex-direction: column;
    padding: 20px 10px;
  }
`;
