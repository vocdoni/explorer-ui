import { ChainAPI, ClientOptions, ElectionAPI, VocdoniSDKClient, VoteAPI } from '@vocdoni/sdk';

export class ExtendedSDKClient extends VocdoniSDKClient {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  txInfo = ({ txHash }: { txHash: string }) => ChainAPI.txInfo(this.url, txHash);
  organizationList = ({ page = 0 }: { page?: number }) => ChainAPI.organizationList(this.url, page);
  organizationCount = () => ChainAPI.organizationCount(this.url);
  validatorsList = () => ChainAPI.validatorsList(this.url);
  voteInfo = ({ voteId }: { voteId: string }) => VoteAPI.info(this.url, voteId);
  electionVotesList = ({ electionId, page }: { electionId: string; page?: number }) =>
    ElectionAPI.votesList(this.url, electionId, page);
  electionVotesCount = ({ electionId }: { electionId: string }) => ElectionAPI.votesCount(this.url, electionId);
}
