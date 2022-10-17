import { Loader } from '@components/blocks/loader'
import { EnvelopeDetails } from '@components/pages/envelopes/details'
import { useEnvelope } from '@hooks/use-envelopes'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { useTranslation } from 'react-i18next'

const EnvelopeDetailPage = () => {
  const { i18n } = useTranslation()
  const nullifier: string = useUrlHash().slice(1)
  const { loadingEnvelope: loading, envelope } = useEnvelope({
    nullifier: nullifier,
  })

  return (
    <If condition={envelope && !loading}>
      <Then>
        <EnvelopeDetails envelope={envelope} />
      </Then>
      <Else>
        <If condition={envelope === null && !loading}>
          <Then>
            <h1>{i18n.t('envelopes.details.envelope_not_found')}</h1>
          </Then>
          <Else>
            <Loader visible />
          </Else>
        </If>
      </Else>
    </If>
  )

}

export default EnvelopeDetailPage
