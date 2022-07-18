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
import { useState } from 'react'
import styled from 'styled-components'

const Page = () => {

  const [nullifier, setNullifier] = useState('')

  return (
    <>
      <VoteImageContainer>
        <img src="/images/add-vote.svg" alt="Vocdoni Logo" />
      </VoteImageContainer>
      <Typography variant={TypographyVariant.H4} color={colors.blueText} margin='0px auto auto'>
          {i18n.t('verify.verify_your_vote')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {i18n.t('verify.introduce_vote_id_below_to_verify_your_vote')}
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
        <Button
          positive
          small
        >
          <LinkContainer>
            <Link href={'/envelopes/show/#/' + nullifier} passHref>
              {i18n.t('verify.verify')}
            </Link>
          </LinkContainer>
        </Button>
      </FlexContainer>
    </>
  )
}

export default Page

const VoteImageContainer = styled.div`
  width: 100px;
  margin: 60px auto 26px;

  & > img {
    width: 100%;
  }
`

const LinkContainer = styled.div`
  & > a {
    color: #FFF
  }
`