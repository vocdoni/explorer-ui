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
import { TransactionType } from '@vocdoni/sdk';

// Stats types

export type BlockInfo = {
  hash: string;
  height: number;
  lastBlockHash: string;
  numTxs: number;
  proposerAddress: string;
  timestamp: string;
};

export type TxForBlock = {
  hash: string;
  index: number;
  type: TransactionType;
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
