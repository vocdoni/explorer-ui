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
import {
  InlineTitleChildrenContainer,
  ListPage,
  TopDiv,
} from '../app/page-templates/list-page'

const VerifyPage = ({
  button,
  setNullifier,
  minified = false,
  onSubmit,
}: {
  button: ReactNode
  setNullifier: (nullifier: string) => void
  minified?: boolean
  onSubmit?: () => void
}) => {
  
  const nullifierInput = (
    <Input
      wide
      placeholder={i18n.t('verify.add_vote_id')}
      onChange={(ev) => {
        setNullifier(ev.target.value)
      }}
    />
  )

  const logo = <img src="/images/add-vote.svg" alt="Vocdoni Logo" />

  const title = (<Typography
    variant={TypographyVariant.H4}
    color={colors.blueText}
    margin="20px 0 20px 0 "
  >
    {i18n.t('verify.verify_your_vote')}
  </Typography>)

  const minifiedLayout = () => {
    return (
      <>
        <FlexContainer
          alignItem={FlexAlignItem.Start}
          justify={FlexJustifyContent.Start}
        >
        <VoteImageContainerMinified>
          <img src="/images/add-vote.svg" alt="Vocdoni Logo" />
        </VoteImageContainerMinified>
          {title}
        </FlexContainer>
        <TopDiv>
          <InlineInput>{nullifierInput}</InlineInput>
          <LeftMargin>
            <Grid>
              <Column>
                <DivWithMarginChildren>{button}</DivWithMarginChildren>
              </Column>
            </Grid>
          </LeftMargin>
        </TopDiv>
      </>
    )
  }

  const normalLayout = () => {
    return (
      <>
        <VoteImageContainer>
          {logo}
        </VoteImageContainer>
        {title}
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {i18n.t(
            'verify.enter_the_voting_receipt_you_received_after_voting_to_verify_your_vote'
          )}
        </Typography>
        <Col align="center">
          <Row align="center">{nullifierInput}</Row>
        </Col>
        <FlexContainer
          alignItem={FlexAlignItem.Center}
          justify={FlexJustifyContent.Center}
        >
          <ButtonContainer>{button}</ButtonContainer>
        </FlexContainer>
      </>
    )
  }

  return <form 
  onSubmit={(ev) => {
    ev.preventDefault()
    if(onSubmit) onSubmit()
  }}
  >{minified ? minifiedLayout() : normalLayout()}</form>
}

export default VerifyPage

const VoteImageContainer = styled.div`
  width: 100px;
  margin: 60px auto 26px;

  & > img {
    width: 100%;
  }
`

const VoteImageContainerMinified = styled.div`
  width: 30px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 20px;
  margin-left: 10px;
  & > img {
    width: 100%;
  }
`

const ButtonContainer = styled.div`
  margin-top: 10px;
`

const InlineInput = styled.span`
  width: 100%;
`

const LeftMargin = styled.span`
  margin-left: 40px;
`
