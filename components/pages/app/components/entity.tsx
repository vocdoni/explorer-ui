import Link from 'next/link'
import { ORGANIZATIONS_PATH } from '@const/routes'
import React, { ReactNode } from 'react'



interface EntityLinkProps {
    entityId: string,
    children: ReactNode,
}

// Wrap a entityId into a link to its entity page
export const EntityLink = ({
    entityId,
    children
}: EntityLinkProps) => {

  return (<Link href={ORGANIZATIONS_PATH + '/#/' + entityId}>{children}</Link>)
}
