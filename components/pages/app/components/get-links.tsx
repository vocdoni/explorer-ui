import {
  BLOCKS_DETAILS,
  PROCESS_DETAILS,
  ENVELOPES_DETAILS,
  ORGANIZATIONS_DETAILS,
  TRANSACTIONS_DETAILS,
} from '@const/routes';
import RouterService from '@lib/router';
import Link from 'next/link';
import { ReactNode } from 'react';

interface IRouterProps {
  [key: string]: string;
}

export const getPath = (path: string, args: IRouterProps) => {
  return RouterService.instance.get(path, args);
};

// Wrap a entityId into a link to its entity page
export const EnvelopeLink = ({ nullifier, children }: { nullifier: string; children: ReactNode }) => {
  return (
    <Link
      href={getPath(ENVELOPES_DETAILS, {
        nullifier: nullifier,
      })}
    >
      {children}
    </Link>
  );
};

export const getOrganizationPath = (entityId: string) => {
  return getPath(ORGANIZATIONS_DETAILS, {
    organizationId: entityId,
  });
};

// Wrap a entityId into a link to its entity page
export const EntityLink = ({ entityId, children }: { entityId: string; children: ReactNode }) => {
  return (
    <Link href={getOrganizationPath(entityId)}>
      <span title={entityId}>{children}</span>
    </Link>
  );
};

export const TransactionLink = ({
  blockHeight,
  index,
  children,
}: {
  blockHeight: string;
  index: string;
  children: ReactNode;
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
  );
};

export const getProcessDetailsPath = (processId: string) => {
  return getPath(PROCESS_DETAILS, {
    processId: processId,
  });
};

export const ProcessLink = ({ processId, children }: { processId: string; children: ReactNode }) => {
  return <Link href={getProcessDetailsPath(processId)}>{children}</Link>;
};

export const BlockLink = ({ blockHeight, children }: { blockHeight: number; children: ReactNode }) => {
  return (
    <Link
      href={getPath(BLOCKS_DETAILS, {
        blockHeight: blockHeight.toString(),
      })}
    >
      {children}
    </Link>
  );
};

export const getTransactionLink = (blockHeight: number, index: number) =>
  getPath(TRANSACTIONS_DETAILS, {
    blockHeight: blockHeight.toString(),
    index: index.toString(),
  });
