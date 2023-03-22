import { ChainAPI, ClientOptions, ElectionAPI, VocdoniSDKClient, VoteAPI } from '@vocdoni/sdk';

export class ExtendedSDKClient extends VocdoniSDKClient {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  txInfo = (txHash: string) => ChainAPI.txInfo(this.url, txHash);
  organizationList = (page?: number) => ChainAPI.organizationList(this.url, page);
  organizationCount = () => ChainAPI.organizationCount(this.url);
  validatorsList = () => ChainAPI.validatorsList(this.url);
  voteInfo = (voteId: string) => VoteAPI.info(this.url, voteId);
  electionVotesList = (electionId: string, page?: number) => ElectionAPI.votesList(this.url, electionId, page);
  electionVotesCount = ({ electionId }: { electionId: string }) => ElectionAPI.votesCount(this.url, electionId);
}
