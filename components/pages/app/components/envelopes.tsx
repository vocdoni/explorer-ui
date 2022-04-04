import { ENVELOPES_DETAILS } from '@const/routes'
import RouterService from '@lib/router'
import Link from 'next/link'
import { ReactNode } from 'react'

function getPath(nullifier: string) {
  return RouterService.instance.get(ENVELOPES_DETAILS, {
    nullifier: nullifier,
  })
}

interface EntityLinkProps {
  envelopId: string
  children: ReactNode
}

// Wrap a entityId into a link to its entity page
export const EnvelopeLink = ({ envelopId, children }: EntityLinkProps) => {
  return <Link href={getPath(envelopId)}>{children}</Link>
}
