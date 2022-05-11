import React from 'react'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { FlexAlignItem } from '@components/elements/flex'
import { ImageContainer } from '@components/elements/images'
import { Grid, Column } from '@components/elements/grid'
import { FeatureSection } from '@components/pages/home/components/feature'
import { Section, BlockContainer } from '@components/elements/styled-divs'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const FeaturedContent = () => {
  const { i18n } = useTranslation()

  return (
    <>
      <br />
      <Section>
        <BlockContainer>
          <Grid>
            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('featured.get_instant_results')}
                subtitle={i18n.t(
                  'featured.you_and_your_social_base_will_be_able_to_se_the_results'
                )}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/instant.png"
                      alt={i18n.t('featured.instant_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>

            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('featured.choose_the_time_frame')}
                subtitle={i18n.t('featured.you_cant_set_the_start_and_end_dates')}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/time-frame.png"
                      alt={i18n.t('featured.time_frame_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>

            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('featured.notify_your_community')}
                subtitle={i18n.t(
                  'featured.all_you_have_to_do_is_email_entire_social_base'
                )}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/notify.png"
                      alt={i18n.t('featured.notify_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>

            <Column md={3} sm={12}>
              <FeatureSection
                title={i18n.t('featured.all_in_one_solution')}
                subtitle={i18n.t(
                  'featured.the_voting_process_includes_all_the_requirements_for_your_voting_process'
                )}
                image={
                  <ImageContainer width="36px">
                    <img
                      src="/images/all-in-one.png"
                      alt={i18n.t('featured.all_in_one_image_alt')}
                    />
                  </ImageContainer>
                }
              />
            </Column>
          </Grid>
        </BlockContainer>
      </Section>
      <br /><br />

      <Section background="linear-gradient(101.89deg, #F1FFDF 17.32%, #E1FFFF 68.46%);">
        <BlockContainer>
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

              <CuttingEdgeFeaturesContainer>
                <ImageContainer width="50px">
                  <img
                    src="/images/censorship.png"
                    alt={i18n.t('featured.censorship_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="60px">
                  <img
                    src="/images/verifiable.png"
                    alt={i18n.t('featured.verifiable_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="70px">
                  <img
                    src="/images/open-source.png"
                    alt={i18n.t('featured.open_source_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="44px">
                  <img
                    src="/images/scalable.png"
                    alt={i18n.t('featured.scalable_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="56px">
                  <img
                    src="/images/anonymous.png"
                    alt={i18n.t('featured.anonymous_image_alt')}
                  />
                </ImageContainer>
                <ImageContainer width="58px">
                  <img
                    src="/images/inexpensive.png"
                    alt={i18n.t('featured.inexpensive_image_alt')}
                  />
                </ImageContainer>
              </CuttingEdgeFeaturesContainer>
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