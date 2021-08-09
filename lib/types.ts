import { EntityMetadata, IProcessSummary, MultiLanguage, ProcessMetadata } from 'dvote-js'

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
  summary: IProcessSummary
  metadata?: ProcessMetadata
}

export type Nullable<T> = T | null
