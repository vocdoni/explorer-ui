import { Loader } from '@components/blocks/loader'
import { BlockView } from '@components/pages/blocks/details'
import { EnvelopeDetails } from '@components/pages/envelopes/details'
import { useEnvelope } from '@hooks/use-envelopes'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { isNullOrUndefined } from 'util'
import { useTranslation } from 'react-i18next'

const BlockDetailPage = () => {
  const { i18n } = useTranslation()
  const nullifier: string = useUrlHash().slice(1)
  const { loadingEnvelope: loading, envelope } = useEnvelope({
    nullifier: nullifier,
  })

  return (
    <If condition={loading}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        <If condition={envelope !== null && envelope !== undefined}>
          <Then>
            <EnvelopeDetails envelope={envelope} />
          </Then>
          <Else>
              <h1>{i18n.t('envelopes.details.envelope_not_found')}</h1>
          </Else>
        </If>
      </Else>
    </If>
  )
}

export default BlockDetailPage
