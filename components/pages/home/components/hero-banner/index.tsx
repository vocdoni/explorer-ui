import React from 'react'
import styled from 'styled-components'

import { Typography, TypographyVariant } from '@components/elements/typography'
import { useTranslation } from 'react-i18next'
import { colors } from 'theme/colors'

import { Button } from '@components/elements/button'
import { sizes } from 'theme/sizes'
import { Grid } from '@components/elements/grid'
import { Card } from '@components/elements/cards'

export const HeroBanner = (props: {
  elections: number
  organizations: number
  averageBlockTime: number
  envelopes: number
}) => {
  const { i18n } = useTranslation()
  return (
    <BannerContainer>
      <ContentContainer>
        <div>
          <Title>
            <strong>{i18n.t('home.vocdoni_explorer')}</strong> <br />
            {i18n.t('home.explore_the_vochain')}
          </Title>

          <Grid>
            <Card sm={6} lg={3}>
              <h4>{i18n.t('home.average_block_time')}</h4>
              <p>
                {i18n.t('home.n_seconds', {
                  seconds: Number(props.averageBlockTime || 0).toFixed(1),
                })}
              </p>
            </Card>
            <Card sm={6} lg={3}>
              <h4>{i18n.t('home.total_elections')}</h4>
              <p>
                {i18n.t('home.n_elections', { elections: props.elections })}
              </p>
            </Card>
            <Card sm={6} lg={3}>
              <h4>{i18n.t('home.total_organizations')}</h4>
              <p>
                {i18n.t('home.n_organizations', {
                  organizations: props.organizations,
                })}
              </p>
            </Card>
            <Card sm={6} lg={3}>
              <h4>{i18n.t('home.total_votes')}</h4>
              <p>{i18n.t('home.n_votes', { votes: props.envelopes })}</p>
            </Card>
          </Grid>
        </div>
      </ContentContainer>
    </BannerContainer>
  )
}

const BannerContainer = styled.div`
  height: 530px;
  margin-top: -110px;
  padding-top: 40px;
  width: 100%;
  overflow: hidden;
  position: relative;

  background: linear-gradient(
    180deg,
    #f0ffde 20.98%,
    #e0ffff 73.1%,
    transparent 100%,
    transparent 100%
  );

  @media ${({ theme }) => theme.screenMax.tablet} {
    height: auto;
  }

  // @media ${({ theme }) => theme.screenMax.tabletL} {
  //   height: auto;
  // }
`

const ContentContainer = styled.div`
  padding: ${({ theme }) => theme.margins.mobile.horizontal};
  max-width: ${sizes.laptopL * 0.8}px;
  height: 100%;
  margin: auto;
  align-items: center;
`

const ButtonContainer = styled.div`
  margin-right: 10px;

  @media ${({ theme }) => theme.screenMax.mobileL} {
    width: 100%;
  }
`
const RightContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 60%;
  width: 47%;
  max-width: 700px;

  @media ${({ theme }) => theme.screenMax.tabletL} {
    position: absolute;
    left: 80%;
    top: 100px;
  }

  @media ${({ theme }) => theme.screenMax.mobileL} {
    top: -42px;
    left: 18px;
    width: 100%;
    max-width: 360px;
    margin: auto;
    height: 290px;
    position: relative;
  }
`

const LeftContainer = styled.div`
  width: 50%;
  float: left;

  @media ${({ theme }) => theme.screenMax.tabletL} {
    width: 60%;
    padding: 40px 0;
  }

  @media ${({ theme }) => theme.screenMax.tablet} {
    width: 80%;
    padding: 40px 0;
  }

  @media ${({ theme }) => theme.screenMax.mobileL} {
    width: 100%;
    text-align: center;
  }
`

const PhoneContainer = styled.div`
  width: 24%;
  position: absolute;
  z-index: 1;

  & > img {
    width: 100%;
  }
`
const ComputerContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

  & > img {
    width: 100%;
  }
`

const ActionContainer = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.screenMax.mobileL} {
    flex-direction: column;
    align-items: start;
  }
`
const Title = styled.h1`
  color: ${({ theme }) => theme.blueText};
  margin-bottom: 30px;
  font-size: 50px;
  font-weight: 400;

  @media ${({ theme }) => theme.screenMax.tablet} {
    font-size: 35px;
  }

  @media ${({ theme }) => theme.screenMax.mobileM} {
    font-size: 24px;
  }
`
