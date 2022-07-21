import { Loader } from '@components/blocks/loader'
import { Button } from '@components/elements/button'
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex'
import { DefaultLayout } from '@components/pages/app/layout/layout'
import { LayoutVerify } from '@components/pages/app/layout/verify'
import { EnvelopeDetails } from '@components/pages/envelopes/details'
import VerifyPage from '@components/pages/verify'
import { useEnvelope } from '@hooks/use-envelopes'
import i18n from '@i18n'
import { useState } from 'react'
import { Else, If, Then } from 'react-if'
import styled from 'styled-components'

const VerifySinglePage = () => {
  const [nullifier, setNullifier] = useState('')
  const [etNullifier, setEtNullifier] = useState('') // Handle edit text state

  const { loadingEnvelope: loading, envelope } = useEnvelope({
    nullifier: nullifier,
  })

  return (
    <>
    <VerifyPageContainer>
        <VerifyPage
          button={
            <Button
              positive
              small
              onClick={(ev) => {
                if (etNullifier.length) setNullifier(etNullifier)
              }}
            >
              {i18n.t('verify.verify')}
            </Button>
          }
          setNullifier={setEtNullifier}
        />
      </VerifyPageContainer>
      <If condition={loading && !envelope}>
        <Then>
          <Loader visible />
        </Then>
        <Else>
          <If condition={envelope !== null && envelope !== undefined}>
            <Then>
              <EnvelopeDetails envelope={envelope} />
            </Then>
            <Else>
              <If condition={nullifier !== null && envelope === null && !loading}>
                <Then>
                <FlexContainer
                  alignItem={FlexAlignItem.Center}
                  justify={FlexJustifyContent.Center}
                >
                  <h2>{i18n.t('envelopes.details.envelope_not_found')}</h2>
                </FlexContainer>
                </Then>
              </If>
            </Else>
          </If>
        </Else>
      </If>
    </>
  )
}

export default VerifySinglePage

const VerifyPageContainer =  styled.div`
margin-bottom: 20px;
`