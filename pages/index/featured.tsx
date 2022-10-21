import React from 'react'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { FlexAlignItem } from '@components/elements/flex'
import { ImageContainer } from '@components/elements/images'
import { Grid, Column } from '@components/elements/grid'
import { FeatureSection } from '@components/pages/home/components/feature'
import { Section, BlockContainer } from '@components/elements/styled-divs'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { HomePageButton } from '@components/elements/button'
import Link from 'next/link'

const FeaturedContent = () => {
  const { i18n } = useTranslation()

  return (
    <>
      <CuttingEdgeFeaturesContainer>
        <ImageContainer width="106px">
          <img
            src="/images/anonymous.png"
            alt={i18n.t('featured.anonymous_image_alt')}
          />
        </ImageContainer>
        <ImageContainer width="120px">
          <img
            src="/images/open-source.png"
            alt={i18n.t('featured.open_source_image_alt')}
          />
        </ImageContainer>
        <ImageContainer width="94px">
          <img
            src="/images/scalable.png"
            alt={i18n.t('featured.scalable_image_alt')}
          />
        </ImageContainer>

        <ImageContainer width="108px">
          <img
            src="/images/inexpensive.png"
            alt={i18n.t('featured.inexpensive_image_alt')}
          />
        </ImageContainer>
        <ImageContainer width="80px">
          <img
            src="/images/censorship_subtitle.png"
            alt={i18n.t('featured.censorship_image_alt')}
          />
        </ImageContainer>
        <ImageContainer width="110px">
          <img
            src="/images/verifiable.png"
            alt={i18n.t('featured.verifiable_image_alt')}
          />
        </ImageContainer>
      </CuttingEdgeFeaturesContainer>

      <Section background="linear-gradient(101.89deg, #F1FFDF 17.32%, #E1FFFF 68.46%);">
        <CenteredBlockContainer>
          <Grid>
            <Column sm={12} md={6}>
              <Typography variant={TypographyVariant.H1} margin='70px 0px 30px'>
                {i18n.t('featured.a_cutting_edge_voting_protocol')}
              </Typography>
              <Typography variant={TypographyVariant.Small}>
                {i18n.t(
                  'featured.a_fully_anonymous_voting_system_ensuring_data_availability'
                )}
              </Typography>
              <Typography variant={TypographyVariant.Small}>
                {i18n.t('featured.leveraging_on_decentalized_technologies')}
              </Typography>
              <HomePageButton>
                <Link href={process.env.PLAZA_URL}>
                  {i18n.t('featured.know_more')}
                </Link>
              </HomePageButton>
            </Column>
            <Column sm={12} md={6}>
              <ImageContainer width="400px" alignItem={FlexAlignItem.Center}>
                <img
                  src="/images/edge-protocol.png"
                  alt={i18n.t('featured.edge_protocol_image_alt')}
                />
              </ImageContainer>
            </Column>
          </Grid>
        </CenteredBlockContainer>
      </Section>
    </>
  )
}

export default FeaturedContent

const CenteredBlockContainer = styled(BlockContainer)`
  display: flex;
  justify-content: center;
`

const CuttingEdgeFeaturesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 15px;
  margin-bottom: 50px;
  align-content: center;

  & > div {
    margin-right: 20px;
  }
`
