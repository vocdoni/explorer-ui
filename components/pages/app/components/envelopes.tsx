import { ENVELOPES_PATH } from "@const/routes"
import Link from "next/link"
import { ReactNode } from "react"

function getPath (envelopId:string) {return ENVELOPES_PATH + '/#/' + envelopId}

interface EntityLinkProps {
    envelopId: string,
    children: ReactNode,
}

// Wrap a entityId into a link to its entity page
export const EnvelopeLink = ({
    envelopId,
    children
}: EntityLinkProps) => {

  return (<Link href={getPath(envelopId)}>{children}</Link>)
}
