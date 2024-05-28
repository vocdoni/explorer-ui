import StatsPage from '@components/pages/stats';
import { Loader } from '@components/blocks/loader';
import { Else, If, Then } from 'react-if';
import styled from 'styled-components';
import { useChainInfo } from '@hooks/use-voconi-sdk';
import { StatsHeroBanner } from '@components/pages/stats/components/stats-hero-banner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
const StatsPageIndex = () => {
  const { loading: loadingStats, data: stats } = useChainInfo();

  return (
    <If condition={loadingStats && stats === undefined}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        <>
          <BannerContainer>
            <StatsHeroBanner stats={stats} />
          </BannerContainer>
          <StatsPage stats={stats} />
        </>
      </Else>
    </If>
  );
};

const BannerContainer = styled.div`
  margin-top: -110px;
  padding-top: 40px;
  width: 100%;
  overflow: hidden;
  position: relative;

  @media ${({ theme }) => theme.screenMax.tablet} {
    height: auto;
  }
`;

export default StatsPageIndex;
