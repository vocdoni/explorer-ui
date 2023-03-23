import { useElection } from '@vocdoni/react-components';
import { ElectionRaw } from '@lib/types';
import { BigNumber } from 'ethers';
import { Vochain } from '@vocdoni/proto';

const useExtendedElection = () => {
  const { election } = useElection();

  const isWeighted = (votingType: Vochain.CensusOrigin): boolean => {
    return (
      votingType == Vochain.CensusOrigin.OFF_CHAIN_TREE_WEIGHTED ||
      votingType == Vochain.CensusOrigin.ERC20 ||
      votingType == Vochain.CensusOrigin.ERC721 ||
      votingType == Vochain.CensusOrigin.ERC1155 ||
      votingType == Vochain.CensusOrigin.ERC777 ||
      votingType == Vochain.CensusOrigin.MINI_ME
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
  const votesWeight = isWeighted(Vochain.CensusOrigin[electionRaw.census.censusOrigin])
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