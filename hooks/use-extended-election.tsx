import { useElection } from '@vocdoni/react-components';
import { ElectionRaw } from '@lib/types';
import { BigNumber } from 'ethers';
import { ProcessCensusOrigin, VochainCensusOrigin } from 'dvote-js';

const useExtendedElection = () => {
  const { election } = useElection();

  const isWeighted = (votingType: VochainCensusOrigin): boolean => {
    return (
      votingType == ProcessCensusOrigin.OFF_CHAIN_TREE_WEIGHTED ||
      votingType == ProcessCensusOrigin.ERC20 ||
      votingType == ProcessCensusOrigin.ERC721 ||
      votingType == ProcessCensusOrigin.ERC1155 ||
      votingType == ProcessCensusOrigin.ERC777 ||
      votingType == ProcessCensusOrigin.MINI_ME
    );
  };

  const countVotesWeight = (results: Array<string>[]): BigNumber => {
    const weightSum = results.reduce(
      (prev, curr) => prev.add(curr.reduce((p, c) => BigNumber.from(c).add(p), BigNumber.from(0))),
      BigNumber.from(0)
    );
    return weightSum.div(results.length);
  };

  const electionRaw = election.raw as ElectionRaw;
  const liveResults = !electionRaw.voteMode.encryptedVotes;
  const votesWeight = isWeighted(electionRaw.census.censusOrigin)
    ? countVotesWeight(election.results)
    : election.voteCount
    ? BigNumber.from(election.voteCount)
    : undefined;
  const results: BigNumber[][] = election.results?.map((innerArray) =>
    innerArray.map((value) => BigNumber.from(value))
  );

  return { election, electionRaw, liveResults, votesWeight, results };
};

export default useExtendedElection;
