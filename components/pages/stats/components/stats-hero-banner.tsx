import { HeroBanner } from '@components/pages/home/components/hero-banner';
import { IChainGetInfoResponse } from '@vocdoni/sdk';

export const StatsHeroBanner = ({ stats }: { stats: IChainGetInfoResponse }) => {
  return (
    <HeroBanner
      processes={stats?.electionCount}
      organizations={stats?.organizationCount}
      averageBlockTime={(stats?.blockTime[0] || 0) / 1000}
      envelopes={stats?.voteCount}
    />
  );
};
