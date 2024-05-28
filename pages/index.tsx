import { Loader } from '@components/blocks/loader';
import { BannerContainer } from '@components/pages/home/components/hero-banner';
import StatsPage from '@components/pages/stats';
import { Else, If, Then } from 'react-if';
import FeaturedContent from './index/featured';
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
// MAIN COMPONENT
const IndexPage = () => {
  const { data: stats } = useChainInfo();

  return (
    <If condition={stats !== undefined}>
      <Then>
        <>
          <BannerContainer>
            <StatsHeroBanner stats={stats} />
          </BannerContainer>
          <StatsPage stats={stats} />
          <FeaturedContent />
        </>
      </Then>
      <Else>
        <Loader visible />
      </Else>
    </If>
  );
};

export default IndexPage;
