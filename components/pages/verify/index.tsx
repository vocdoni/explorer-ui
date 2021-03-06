import { Col, Row } from '@components/elements-v2'
import { Button } from '@components/elements/button'
import {
  FlexAlignItem,
  FlexContainer,
  FlexJustifyContent,
  InlineFlex,
} from '@components/elements/flex'
import { Column, Grid } from '@components/elements/grid'
import { Input } from '@components/elements/inputs'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { Typography, TypographyVariant } from '@components/elements/typography'
import i18n from '@i18n'
import { colors } from '@theme/colors'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import styled from 'styled-components'

const VerifyPage = ({button, setNullifier} : {button: ReactNode, setNullifier: (nullifier: string) => void }) => {

  return (
    <>
      <VoteImageContainer>
        <img src="/images/add-vote.svg" alt="Vocdoni Logo" />
      </VoteImageContainer>
      <Typography variant={TypographyVariant.H4} color={colors.blueText} margin='0px auto auto'>
          {i18n.t('verify.verify_your_vote')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {i18n.t('verify.enter_the_voting_receipt_you_received_after_voting_to_verify_your_vote')}
        </Typography>
      <Col align="center">
        <Row align="center">
          <Input 
            wide 
            placeholder={i18n.t('verify.add_vote_id')} 
            onChange={(ev) => {
              setNullifier(ev.target.value)
            }}
          />
        </Row>
      </Col>
      <FlexContainer
        alignItem={FlexAlignItem.Center}
        justify={FlexJustifyContent.Center}
      >
        <ButtonContainer>
            {button}
        </ButtonContainer>
      </FlexContainer>
    </>
  )
}

export default VerifyPage

const VoteImageContainer = styled.div`
  width: 100px;
  margin: 60px auto 26px;

  & > img {
    width: 100%;
  }
`
const ButtonContainer = styled.div`
margin-top: 10px;
`

