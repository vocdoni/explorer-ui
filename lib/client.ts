import { ChainAPI, ClientOptions, ElectionAPI, VocdoniSDKClient, VoteAPI } from '@vocdoni/sdk';

export class ExtendedSDKClient extends VocdoniSDKClient {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  txInfo = (txHash: string) => ChainAPI.txInfo(this.url, txHash);
  txInfoByBlock = (blockHeight: number, txIndex: number) => ChainAPI.txInfoByBlock(this.url, blockHeight, txIndex);
  organizationList = (page?: number, organizationId?: string) =>
    ChainAPI.organizationList(this.url, page, organizationId);
  organizationCount = () => ChainAPI.organizationCount(this.url);
  validatorsList = () => ChainAPI.validatorsList(this.url);
  chainInfo = () => ChainAPI.info(this.url);
  voteInfo = (voteId: string) => VoteAPI.info(this.url, voteId);
  electionVotesList = (electionId: string, page?: number) => ElectionAPI.votesList(this.url, electionId, page);
  electionVotesCount = (electionId: string) => ElectionAPI.votesCount(this.url, electionId);
}
