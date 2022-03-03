import React from 'react'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { FlexAlignItem } from '@components/elements/flex'
import { ImageContainer } from '@components/elements/images'
import { Grid, Column } from '@components/elements/grid'
import { FeatureSection } from '@components/pages/home/components/feature'

import i18n from '@i18n'
import { Section, BlockContainer } from '@components/elements/styled-divs'
import styled from 'styled-components'


const FeaturedContent = () => {
  return (
    <>
      <Section background="#FEFEFF">
        <BlockContainer>
          <Grid>
            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('home.get_instant_results')}
                subtitle={i18n.t(
                  'home.you_and_your_social_base_will_be_able_to_se_the_results'
                )}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/home/features/instant.png"
                      alt={i18n.t('home.instant_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>

            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('home.choose_the_time_frame')}
                subtitle={i18n.t('home.you_cant_set_the_start_and_end_dates')}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/home/features/time-frame.png"
                      alt={i18n.t('home.time_frame_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>

            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('home.notify_your_community')}
                subtitle={i18n.t(
                  'home.all_you_have_to_do_is_email_entire_social_base'
                )}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/home/features/notify.png"
                      alt={i18n.t('home.notify_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>

            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('home.all_in_one_solution')}
                subtitle={i18n.t(
                  'home.the_voting_process_includes_all_the_requirements_for_your_voting_process'
                )}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/home/features/all-in-one.png"
                      alt={i18n.t('home.all_in_one_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>
          </Grid>
        </BlockContainer>
      </Section>

      <Section background="linear-gradient(101.89deg, #F1FFDF 17.32%, #E1FFFF 68.46%);">
        <BlockContainer>
          <Grid>
            <Column sm={12} md={6}>
              <Typography variant={TypographyVariant.H1}>
                {i18n.t('home.a_cutting_edge_voting_protocol')}
              </Typography>
              <Typography variant={TypographyVariant.Small}>
                {i18n.t(
                  'home.a_fully_anonymous_voting_system_ensuring_data_availability'
                )}
              </Typography>
              <Typography variant={TypographyVariant.Small}>
                {i18n.t('home.leveraging_on_decentalized_technologies')}
              </Typography>

              <CuttingEdgeFeaturesContainer>
                <ImageContainer width="50px">
                  <img
                    src="/images/home/cutting-edge/censorship.png"
                    alt={i18n.t('home.censorship_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="60px">
                  <img
                    src="/images/home/cutting-edge/verifiable.png"
                    alt={i18n.t('home.verifiable_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="70px">
                  <img
                    src="/images/home/cutting-edge/open-source.png"
                    alt={i18n.t('home.open_source_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="44px">
                  <img
                    src="/images/home/cutting-edge/scalable.png"
                    alt={i18n.t('home.scalable_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="56px">
                  <img
                    src="/images/home/cutting-edge/anonymous.png"
                    alt={i18n.t('home.anonymous_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="58px">
                  <img
                    src="/images/home/cutting-edge/inexpensive.png"
                    alt={i18n.t('home.inexpensive_image_alt')}
                  />
                </ImageContainer>
              </CuttingEdgeFeaturesContainer>
            </Column>

            <Column sm={12} md={6}>
              <ImageContainer width="400px" alignItem={FlexAlignItem.Center}>
                <img
                  src="/images/home/cutting-edge/edge-protocol.png"
                  alt={i18n.t('home.edge_protocol_image_alt')}
                />
              </ImageContainer>
            </Column>
          </Grid>
        </BlockContainer>
      </Section>
    </>
  )
}

export default FeaturedContent

const CuttingEdgeFeaturesContainer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: start;
  & > div {
    margin-right: 20px;
  }
`