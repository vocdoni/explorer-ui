import {
  BLOCKS_DETAILS,
  ELECTIONS_DETAILS,
  ENVELOPES_DETAILS,
  ORGANIZATIONS_DETAILS,
  TRANSACTIONS_DETAILS,
} from '@const/routes'
import RouterService from '@lib/router'
import Link from 'next/link'
import { ReactNode } from 'react'

interface IRouterProps {
  [key: string]: string
}

export const getPath = (path: string, args: IRouterProps) => {
  return RouterService.instance.get(path, args)
}

// Wrap a entityId into a link to its entity page
export const EnvelopeLink = ({
  nullifier,
  children,
}: {
  nullifier: string
  children: ReactNode
}) => {
  return (
    <Link
      href={getPath(ENVELOPES_DETAILS, {
        nullifier: nullifier,
      })}
    >
      {children}
    </Link>
  )
}

export const getOrganizationPath = (entityId: string) => {
  return getPath(ORGANIZATIONS_DETAILS, {
    organizationId: entityId,
  })
}

// Wrap a entityId into a link to its entity page
export const EntityLink = ({
  entityId,
  children,
}: {
  entityId: string
  children: ReactNode
}) => {
  return <Link href={getOrganizationPath(entityId)}>{children}</Link>
}

export const TransactionLink = ({
  blockHeight,
  index,
  children,
}: {
  blockHeight: string
  index: string
  children: ReactNode
}) => {
  return (
    <Link
      href={getPath(TRANSACTIONS_DETAILS, {
        blockHeight: blockHeight,
        index: index,
      })}
    >
      {children}
    </Link>
  )
}

export const getElectionDetailsPath = (electionsId: string) => {
  return getPath(ELECTIONS_DETAILS, {
    electionsId: electionsId,
  })
}

export const ElectionLink = ({
  electionsId,
  children,
}: {
  electionsId: string
  children: ReactNode
}) => {
  return <Link href={getElectionDetailsPath(electionsId)}>{children}</Link>
}

export const BlockLink = ({
  blockHeight,
  children,
}: {
  blockHeight: number
  children: ReactNode
}) => {
  return (
    <a
      href={
        getPath(BLOCKS_DETAILS, {
          blockHeight: blockHeight.toString(),
        })
      }
    >
      {children}
    </a>
  )
}
