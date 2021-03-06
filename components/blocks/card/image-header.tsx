import React from 'react'
import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

import { SectionText, SectionTitle, TextAlign } from '@components/elements/text'
import { PageCardHeader } from '@components/elements/cards'
import { FALLBACK_VOTE_HEADER_IMAGE } from '@const/vote'
import { Grid, Column } from '@components/elements/grid'

import { Image } from '../../elements/image'
import { BreakWord } from '@components/elements/styled-divs'

interface ICardImageHeader {
  title: string
  subtitle?: string
  entityImage?: string
  processImage?: string
}

export const CardImageHeader = ({
  title,
  subtitle,
  entityImage,
  processImage,
}: ICardImageHeader) => {
  const { i18n } = useTranslation()
  const headerImageSrc = processImage || FALLBACK_VOTE_HEADER_IMAGE
  const entityImageSrc = entityImage || ''

  return (
    <CardImageHeaderContainer>
      <PageCardHeader>
        <Image
          src={headerImageSrc}
          alt={i18n.t('components.cardimage.vote_process_image_alt')}
        />
      </PageCardHeader>

      {entityImageSrc.length > 0 && (
        <EntityLogoWrapper>
          <Image
            src={entityImageSrc}
            alt={i18n.t('components.cardimage.organization_logo_alt')}
          />
        </EntityLogoWrapper>
      )}

      <Grid>
        <Column>
          <SectionTitle align={TextAlign.Center}>{title}</SectionTitle>
          {subtitle && (

            <SectionText align={TextAlign.Center} color="accent1">
              <BreakWord>
                {subtitle}
              </BreakWord>
            </SectionText>
          )}
        </Column>
      </Grid>
    </CardImageHeaderContainer>
  )
}

const CardImageHeaderContainer = styled.div``

const EntityLogoWrapper = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 130px;
  height: 130px;
  display: flex;
  margin: -90px auto 10px;
  border: solid 1px ${({ theme }) => theme.white};

  & > img {
    max-height: 100%;
    max-width: 100%;
  }
`
