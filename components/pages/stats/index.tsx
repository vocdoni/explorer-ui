import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { colors } from 'theme/colors';
import { Grid } from '@components/elements/grid';
import { Card } from '@components/elements/cards';

import { localizedDateDiff } from '@lib/date';
import { useTranslation } from 'react-i18next';
import { BlockContainer, Section } from '@components/elements/styled-divs';
import { BlockCard } from '@components/pages/blocks/components/BlockCard';
import { capitalize } from '@lib/util';
import { MdSpeed } from 'react-icons/md';
import { VscGraphLine } from 'react-icons/vsc';
import { HomePageButton } from '@components/elements/button';
import Link from 'next/link';
import { IChainGetInfoResponse } from '@vocdoni/sdk';
import { useBlockList } from '@hooks/use-voconi-sdk';
import { When } from 'react-if';

const BLOCK_LIST_SIZE = 4;

const BlockList = ({ blockHeight }: { blockHeight: number }) => {
  const { i18n } = useTranslation();
  const firstBlock = blockHeight - (BLOCK_LIST_SIZE - 1);

  const { data: blocks } = useBlockList({
    from: firstBlock,
    listSize: BLOCK_LIST_SIZE,
  });

  return (
    <>
      {blocks?.length ? (
        blocks.map((item, i) => (
          <BlockCard
            key={i}
            style={{ border: '1px solid #E4E7EB' }}
            blockHeight={item.header.height}
            blockTime={item.header.time}
            proposer={item.header.proposerAddress}
          />
        ))
      ) : (
        <h3>{i18n.t('stats.getting_block_info')}</h3>
      )}
    </>
  );
};

const StatsPage = ({ stats }: { stats: IChainGetInfoResponse }) => {
  const { i18n } = useTranslation();

  let blockHeight: number;
  if (stats && stats?.height) {
    blockHeight = stats.height;
  }

  const syncing = stats?.syncing ? i18n.t('stats.syncing') : i18n.t('stats.in_sync');

  return (
    <div>
      <Section>
        <BlockContainer>
          <Grid>
            <Card md={6}>
              <VerticallyCenter>
                <CardTitle title={i18n.t('stats.latest_block')} icon={<VscGraphLine />}></CardTitle>
                <When condition={blockHeight !== null}>
                  <BlockList blockHeight={blockHeight} />
                </When>
                <HomePageButton>
                  <Link href={'blocks/'} passHref>
                    {i18n.t('stats.view_all_blocks')}
                  </Link>
                </HomePageButton>
              </VerticallyCenter>
            </Card>
            <Card md={6}>
              <VerticallyCenter>
                <CardTitle title={i18n.t('stats.blockchain_info')} icon={<MdSpeed />}></CardTitle>
                <TitleSubtitleList>
                  <TitleSubtitle title={i18n.t('stats.network_id')}>{capitalize(stats?.chainId)}</TitleSubtitle>
                  <TitleSubtitle title={i18n.t('stats.bloc_height')}>{stats?.height}</TitleSubtitle>
                  <TitleSubtitle title={i18n.t('stats.nr_of_validators')}>{stats?.validatorCount}</TitleSubtitle>
                  <TitleSubtitle title={i18n.t('stats.sync_status')}>{syncing}</TitleSubtitle>
                  <TitleSubtitle title={i18n.t('stats.genesis_block_date')}>
                    {localizedDateDiff(new Date(stats?.genesisTime))}
                  </TitleSubtitle>
                </TitleSubtitleList>
              </VerticallyCenter>
            </Card>
          </Grid>
        </BlockContainer>
      </Section>
    </div>
  );
};

const CardTitle = ({ title, icon }: { title: string; icon: ReactNode }) => (
  <CardTitleWrapper>
    <Typography variant={TypographyVariant.H4} color={colors.text}>
      <TitleIcon>{icon}</TitleIcon>
      <strong>{title}</strong>
    </Typography>
  </CardTitleWrapper>
);

const CardTitleWrapper = styled.div`
  h4 {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }
`;

const TitleIcon = styled.div`
  color: ${(props) => props.theme.textAccent1};
`;

const TitleSubtitle = ({ title, children }: { title: string; children: string | number }) => (
  <TitleSubtitleWrapper>
    <Title>
      <strong>{title}</strong>
    </Title>
    <Subtitle>{children}</Subtitle>
  </TitleSubtitleWrapper>
);

const TitleSubtitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0px 0px;
  gap: 8px;
`;

const Title = styled.h5`
  color: ${(props) => props.theme.blueText};
  margin: 30px 0px -3px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  margin: 0;
`;

const Subtitle = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: #7b8794;
  margin: 0;
`;

const VerticallyCenter = styled.div`
  margin: 30px 0;
  padding-left: 15px;
  min-height: 500px;
`;

const TitleSubtitleList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
`;
export default StatsPage;
