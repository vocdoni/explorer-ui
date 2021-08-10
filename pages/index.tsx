import React from 'react'
import styled from 'styled-components'
// import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

// import { Button } from '../components/elements/button'
import { } from '@const/routes'
import {
  TextAlign,
  Typography,
  TypographyVariant,
} from '@components/elements/typography'
import { colors } from 'theme/colors'
import { FlexAlignItem } from '@components/elements/flex'
import { ImageContainer } from '@components/elements/images'
import { Grid, Column } from '@components/elements/grid'
import { FeatureSection } from '@components/pages/_home/components/feature'
import { HeroBanner } from '@components/pages/_home/components/hero-banner'
import { Card, CardDiv } from '@components/elements/cards'
import { EmptyProviders } from '@components/pages/app/providers/empty-providers'

import { sizes } from 'theme/sizes'

// MAIN COMPONENT
const IndexPage = () => {
  // const { i18n } = useTranslation()

  return (
    <div>
      <HeroBanner />

      <Section>
        <BlockContainer>
          <Typography
            variant={TypographyVariant.HeroBanner}
            color={colors.blueText}
          >
            {i18n.t('home.recent_blocks')}
          </Typography>
          <Typography
            variant={TypographyVariant.Small}
            color={colors.blueText}
          >
            {i18n.t('home.the_last_four_blocks')}
          </Typography>

          <Grid>
            <Card sm={6} md={4} lg={3}>
              <h4>Block 1234</h4>
              <p>Proposer: <code>0x1234</code></p>
            </Card>
            <Card sm={6} md={4} lg={3}>
              <h4>Block 1234</h4>
              <p>Proposer: <code>0x1234</code></p>
            </Card>
            <Card sm={6} md={4} lg={3}>
              <h4>Block 1234</h4>
              <p>Proposer: <code>0x1234</code></p>
            </Card>
            <Card sm={6} md={4} lg={3}>
              <h4>Block 1234</h4>
              <p>Proposer: <code>0x1234</code></p>
            </Card>
          </Grid>

        </BlockContainer>
      </Section>

      <Section>
        <BlockContainer>
          <code>
            Blockchain information
            ID
            vocdoni-release-1.0.1
            Blockchain genesis timestamp
            Wed May 12 12:38:33 UTC 2021
            Block height
            646,821
            Latest block timestamp
            Mon Aug 9 21:26:47 UTC 2021
            Total transactions
            1,223
            Total entities
            120
            Total processes
            310
            Number of validators
            5
            Total vote envelopes
            5,229
            Sync status
            In sync
          </code>
        </BlockContainer>
      </Section>

      <Section background='#FEFEFF'>
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

      <Section background='linear-gradient(101.89deg, #F1FFDF 17.32%, #E1FFFF 68.46%);'>
        <BlockContainer>
          <Grid>
            <Column sm={12} md={6}>
              <Typography
                variant={TypographyVariant.H1}
              >
                {i18n.t('home.a_cutting_edge_voting_protocol')}
              </Typography>
              <Typography
                variant={TypographyVariant.Small}
              >
                {i18n.t(
                  'home.a_fully_anonymous_voting_system_ensuring_data_availability'
                )}
              </Typography>
              <Typography
                variant={TypographyVariant.Small}
              >
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

      <Section>
        <BlockContainer>
          <ReadyToStartCard>
            <Grid>
              <Column sm={12} md={6}>
                <ReadyTextContainer>
                  <Typography variant={TypographyVariant.H1}>
                    {i18n.t('home.ready_to_start')}
                    <br />
                    <strong>{i18n.t('home.try_vocdony_now')}</strong>
                  </Typography>

                  <Typography>
                    {i18n.t(
                      'home.a_full_anonymous_voting_system_ensuring_data_availability_and_anti_censorship'
                    )}
                  </Typography>
                </ReadyTextContainer>
              </Column>

              <Column sm={12} md={6}>
                <ImageContainer width="500px">
                  <img
                    src="/images/home/pc.png"
                    alt={i18n.t('home.computer_with_vocdoni_alt')}
                  />
                </ImageContainer>
              </Column>
            </Grid>
          </ReadyToStartCard>
        </BlockContainer>
      </Section>
    </div>
  )
}

IndexPage['Providers'] = EmptyProviders

const ReadyTextContainer = styled.div`
  margin: 40px 0 40px 40px;
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  & > a {
    margin-right: 20px;
  }
`

const ReadyToStartCard = styled(CardDiv)`
  background: linear-gradient(101.89deg, #f1ffdf 17.32%, #e1ffff 68.46%);
`

const QuestionCard = styled(CardDiv)`
  max-width: 900px;
  margin: 10px auto;
  padding-right: 80px;
  position: relative;

  &::after {
    text-align: center;
    line-height: 40px;
    color: #000;
    position: absolute;
    font-size: 30px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    right: 20px;
    top: 23px;
    background-color: #dfebf7;
    content: '>';
  }
`

const Section = styled.section<{ background?: string }>`
  padding: 30px 0;
  ${({ background }) => background ? `background: ${background};` : ''}
`

const BlockContainer = styled.div`
  max-width: ${sizes.laptopL * 0.8}px;
  margin: auto;
  padding: 0 15px;
`


const CuttingEdgeFeaturesContainer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: start;

  & > div {
    margin-right: 20px;
  }
`
export default IndexPage