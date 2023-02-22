import { ChainAPI, ClientOptions, VocdoniSDKClient } from '@vocdoni/sdk'

export class ExtendedSDKClient extends VocdoniSDKClient{

  constructor(opts: ClientOptions) {
    super(opts);
  }

  txInfo = ({ txHash } : { txHash: string} ) => ChainAPI.txInfo(this.url, txHash);
  organizationList = ({ page = 0 } : { page?: number } ) =>
    ChainAPI.organizationList(this.url, page);
  organizationCount = () => ChainAPI.organizationCount(this.url);
  validatorsList = () => ChainAPI.validatorsList(this.url)
}
