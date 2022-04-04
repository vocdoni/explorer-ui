import { Loader } from '@components/blocks/loader'
import { BlockView } from '@components/pages/blocks/details'
import { EnvelopeDetails } from '@components/pages/envelopes/details'
import { useEnvelope } from '@hooks/use-envelopes'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'

const BlockDetailPage = () => {
  const nullifier: string = useUrlHash().slice(1)
  const { loadingEnvelope: loading , envelope } = useEnvelope({ nullifier: nullifier })

  // todo(ritmo): create an error page
  return (
    <If condition={loading}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        <EnvelopeDetails envelope={envelope} />
      </Else>
    </If>
  )
}

export default BlockDetailPage
