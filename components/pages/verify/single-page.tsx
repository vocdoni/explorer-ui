import { Loader } from '@components/blocks/loader'
import { Button } from '@components/elements/button'
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex'
import { FakedButton } from '@components/elements/styled-divs'
import { EnvelopeDetails } from '@components/pages/envelopes/details'
import VerifyPage from '@components/pages/verify'
import i18n from '@i18n'
import { useEffect, useState } from 'react'
import { Else, If, Then, When } from 'react-if'
import styled from 'styled-components'
import Router, { useRouter } from 'next/router'
import { ENVELOPES_DETAILS, VERIFY_DETAILS } from '@const/routes'
import { getPath } from '@components/pages/app/components/get-links'
import { useVoteInfo } from '@hooks/use-voconi-sdk'

const VerifySinglePage = ({ urlVoteId } : { urlVoteId: string }) => {
  const [voteId, setVoteId] = useState('')
  const [etVoteId, setEtVoteId] = useState('') // Handle edit text state

  const { loading, data: envelope } = useVoteInfo({
    voteId: voteId,
  })

  const onClick = () => {
    if (etVoteId.length) {
      Router.push(getPath(VERIFY_DETAILS, {
        voteId: etVoteId
      }))
      setVoteId(etVoteId)
    }
  }

  useEffect(() => {
    setVoteId(urlVoteId)
  }, [urlVoteId])

  const envelopeNotFound = (voteId || urlVoteId) && envelope === null && !loading
  const envelopeLoaded = envelope !== null && envelope !== undefined
  const isLoading = (loading && !envelope) || (urlVoteId && envelope === undefined)

  return (
    <>
      <VerifyPageContainer>
        <VerifyPage
          minified={envelopeLoaded || envelopeNotFound}
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
          setVoteId={setEtVoteId}
        />
      </VerifyPageContainer>
      <If condition={isLoading}>
        <Then>
          <Loader visible />
        </Then>
        <Else>
          <If condition={envelopeLoaded}>
            <Then>
              <EnvelopeDetails envelope={envelope} />
            </Then>
            <Else>
              <When condition={envelopeNotFound}>
                <FlexContainer
                  alignItem={FlexAlignItem.Center}
                  justify={FlexJustifyContent.Center}
                >
                  <h2>{i18n.t('envelopes.details.envelope_not_found')}</h2>
                </FlexContainer>
              </When>
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
