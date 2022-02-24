import { EntityMetadata, ProcessSummary, MultiLanguage, ProcessMetadata } from 'dvote-js'

// IndexDB types
export enum AccountStatus {
  Wallet,
  Media,
  BalanceRequested,
  Balance,
  Metadata,
  Ready
}


export type Account = {
  name: string,
  encryptedMnemonic: string,
  hdPath?: string,
  locale?: string
  address: string,
  hasBackup?: boolean,
  status?: AccountStatus,
  pending?: {
    creation: boolean,
    metadata: EntityMetadata,
    email: string
  }
}

// Shared types

export type Question = {
  title: MultiLanguage<string>
  description?: MultiLanguage<string>
  choices: Choice[]
}

export type Choice = {
  title: MultiLanguage<string>
  value: number
}


export interface IProcessesSummary {
  id: string
  summary: ProcessSummary
  metadata?: ProcessMetadata
}

export type Nullable<T> = T | null

// Stats types

export type BlockInfo = {
  hash: string
  height: number
  last_block_hash: string
  num_txs: number
  proposer_address: string
  timestamp: string
}

export type Stats = {
  block_height: number
  block_time: [number, number, number, number, number]
  block_time_stamp: number
  chain_id: string
  entity_count: number
  envelope_count: number
  genesis_time_stamp: string
  process_count: number
  syncing: boolean
  transaction_count: number
  validator_count: number
}