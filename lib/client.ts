import { ChainAPI, ClientOptions, ElectionAPI, IChainBlockInfoResponse, VocdoniSDKClient, VoteAPI } from '@vocdoni/sdk';

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
  validatorsList = () => ChainAPI.validatorsList(this.url);
  chainInfo = () => ChainAPI.info(this.url);
  blockByHash = (hash: string) => ChainAPI.blockByHash(this.url, hash);
  blockByHeight = (height: number) => ChainAPI.blockByHeight(this.url, height);
  voteInfo = (voteId: string) => VoteAPI.info(this.url, voteId);
  electionVotesList = (electionId: string, page?: number) => ElectionAPI.votesList(this.url, electionId, page);
  electionVotesCount = (electionId: string) => ElectionAPI.votesCount(this.url, electionId);
  blockByHeight = (height: number) => ChainAPI.blockByHeight(this.url, height);
  blockList = (from: number, listSize: number | null = 10): Promise<IChainBlockInfoResponse[]> => {
    const promises: Promise<IChainBlockInfoResponse>[] = [];
    for (let i = 0; i < listSize; i++) {
      // todo: this method will be fixed backend side, see https://github.com/vocdoni/interoperability/issues/33
      promises.push(this.blockByHeight(from + i));
    }
    return Promise.all(promises).then((blockInfo) => {
      // flatten the array[][] into array[]
      return blockInfo.reduce((prev, cur) => prev.concat(cur), []);
    });
  };
}
