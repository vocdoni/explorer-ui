import { Loader } from '@components/blocks/loader'
import { Button } from '@components/elements/button'
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex'
import { FakedButton } from '@components/elements/styled-divs'
import { DefaultLayout } from '@components/pages/app/layout/layout'
import { LayoutVerify } from '@components/pages/app/layout/verify'
import { EnvelopeDetails } from '@components/pages/envelopes/details'
import VerifyPage from '@components/pages/verify'
import { useEnvelope } from '@hooks/use-envelopes'
import i18n from '@i18n'
import { useEffect, useState } from 'react'
import { Else, If, Then } from 'react-if'
import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { ENVELOPES_DETAILS, VERIFY_DETAILS } from '@const/routes'
import { getPath } from '@components/pages/app/components/get-links'

const VerifySinglePage = ({ voteNullifier } : { voteNullifier: string }) => {
  const [nullifier, setNullifier] = useState('')
  const [etNullifier, setEtNullifier] = useState('') // Handle edit text state

  const { loadingEnvelope: loading, envelope } = useEnvelope({
    nullifier: nullifier,
  })

  const onClick = () => {
    if (etNullifier.length) {
      Router.push(getPath(VERIFY_DETAILS, {
        nullifier: etNullifier
      }))
      setNullifier(etNullifier)
    }
  }

  useEffect(() => {
    setNullifier(voteNullifier)
  }, [voteNullifier])

  return (
    <>
    <VerifyPageContainer>
        <VerifyPage
          minified={envelope !== null && envelope !== undefined}
          onSubmit={onClick}
          button={
            <Button
              positive
              small
              onClick={onClick}
            >
              <FakedButton>
                {i18n.t('verify.verify')}
              </FakedButton>
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
