import {
  EntityMetadata,
  ProcessSummary,
  ProcessMetadata,
  Tx,
  ProcessCensusOrigin,
  ProcessResultsSingleChoice,
} from 'dvote-js';
import { BigNumber } from 'ethers';
import { Vochain } from '@vocdoni/proto';

export enum VotingType {
  Normal = ProcessCensusOrigin.OFF_CHAIN_TREE,
  Weighted = ProcessCensusOrigin.OFF_CHAIN_TREE_WEIGHTED,
  Anonymous = 3,
}

export interface IProcessResults extends ProcessResultsSingleChoice {
  totalWeightedVotes?: BigNumber;
}

// IndexDB types
export enum AccountStatus {
  Wallet,
  Media,
  BalanceRequested,
  Balance,
  Metadata,
  Ready,
}

export type Account = {
  name: string;
  encryptedMnemonic: string;
  hdPath?: string;
  locale?: string;
  address: string;
  hasBackup?: boolean;
  status?: AccountStatus;
  pending?: {
    creation: boolean;
    metadata: EntityMetadata;
    email: string;
  };
};

// Shared types

export interface IProcessesSummary {
  id: string;
  summary: ProcessSummary;
  metadata?: ProcessMetadata;
}

export type Nullable<T> = T | null;

// Stats types

export type BlockInfo = {
  hash: string;
  height: number;
  lastBlockHash: string;
  numTxs: number;
  proposerAddress: string;
  timestamp: string;
};

export type Stats = {
  block_height: number;
  block_time: [number, number, number, number, number];
  block_time_stamp: number;
  chain_id: string;
  entity_count: number;
  envelope_count: number;
  genesis_time_stamp: string;
  process_count: number;
  syncing: boolean;
  transaction_count: number;
  validator_count: number;
};

// Transactions
export enum TxType {
  vote = 'vote',
  newProcess = 'newProcess',
  admin = 'admin',
  setProcess = 'setProcess',
  registerKey = 'registerKey',
  mintTokens = 'mintTokens',
  sendTokens = 'sendTokens',
  setTransactionCosts = 'setTransactionCosts',
  setAccountInfo = 'setAccountInfo',
  setAccountDelegateTx = 'setAccountDelegateTx',
  collectFaucet = 'collectFaucet',
  setKeykeeper = 'setKeykeeper',
}

export type TxForBlock = {
  hash: string;
  index: number;
  type: TxType;
};

// Validators

export type Validator = {
  address: string;
  power: number;
  pubKey: string;
};

export type GetTx = {
  hash: string;
  signature: string;
  tx: string | Tx;
  payload: Tx;
};

export type GetTxByHash = {
  transactionNumber: number;
  transactionHash: string;
  blockHeight: number;
  transactionIndex: number;
  transactionType: string;
};

export type TxById = {
  blockHeight: number;
  hash: string;
  id: number;
  signature: string;
  tx: string;
  index: number;
  payload: Tx;
};

export interface ElectionRaw {
  electionId: string;
  type: string;
  status: Vochain.ProcessStatus;
  startDate: string;
  endDate: string;
  voteCount: number;
  finalResults: boolean;
  result: string[][];
  census: {
    censusOrigin: string;
    censusRoot: string;
    postRegisterCensusRoot: string;
    censusURL: string;
  };
  creationTime: string;
  metadataURL: string;
  voteMode: {
    serial: boolean;
    anonymous: boolean;
    encryptedVotes: boolean;
    uniqueValues: boolean;
    costFromWeight: boolean;
  };
  electionMode: {
    autoStart: boolean;
    interruptible: boolean;
    dynamicCensus: boolean;
    encryptedMetaData: boolean;
    preRegister: boolean;
  };
  tallyMode: {
    maxCount: number;
    maxValue: number;
    maxVoteOverwrites: number;
    maxTotalCost: number;
    costExponent: number;
  };
}
