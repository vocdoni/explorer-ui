import { AccountAPI, ChainAPI, ClientOptions, ElectionAPI, VocdoniSDKClient, VoteAPI } from '@vocdoni/sdk';
import { IElectionListFilter } from '../../VocdoniStack/vocdoni-sdk/src';

export class ExtendedSDKClient extends VocdoniSDKClient {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  txInfo = (txHash: string) => ChainAPI.txInfo(this.url, txHash);
  txInfoByBlock = (blockHeight: number, txIndex: number) => ChainAPI.txInfoByBlock(this.url, blockHeight, txIndex);
  txList = (page?: number) => ChainAPI.txList(this.url, page);
  organizationList = (page?: number, organizationId?: string) =>
    ChainAPI.organizationList(this.url, page, organizationId);
  organizationCount = () => ChainAPI.organizationCount(this.url);
  organizationElectionsList = (organizationId: string, page?: number) =>
    AccountAPI.electionsList(this.url, organizationId, page);
  validatorsList = () => ChainAPI.validatorsList(this.url);
  chainInfo = () => ChainAPI.info(this.url);
  voteInfo = (voteId: string) => VoteAPI.info(this.url, voteId);
  electionVotesList = (electionId: string, page?: number) => ElectionAPI.votesList(this.url, electionId, page);
  electionVotesCount = (electionId: string) => ElectionAPI.votesCount(this.url, electionId);
  electionList = (page: number, electionId?: string, organizationId?: string, status?: any, withResults?: boolean) =>
    ElectionAPI.electionsList(this.url, page, {
      electionId,
      organizationId,
      status,
      withResults,
    });
}
