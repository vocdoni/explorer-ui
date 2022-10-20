import {
  CardItemTitle,
  GenericCardWrapper,
  GenericCardWrapperProps,
} from '@components/elements/card-generic'
import { BreakWord } from '@components/elements/styled-divs'
import { StrongAndText } from '@components/elements/text'
import { useIsMobile } from '@hooks/use-window-size'
import { Validator } from '@lib/types'
import { theme } from '@theme/global'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CopyButton } from '../copy-button'

export const ValidatorCard = ({
  validatorData,
  ...props
}: GenericCardWrapperProps & {
  validatorData: Validator
}) => {
  const { i18n } = useTranslation()
  const isMobile = useIsMobile()
  const pubKey = validatorData.pubKey

  const Footer = () => {
    return (
      <FooterWrapper>
        <StrongAndText title={i18n.t('components.validator.Pubkey') + ': '}>
          <CopyButton
            color={theme.textAccent1}
            text={
              isMobile
                ? pubKey.substring(0, 10) +
                  '...' +
                  pubKey.substring(pubKey.length - 10, pubKey.length)
                : pubKey
            }
            toCopy={pubKey}
          ></CopyButton>
        </StrongAndText>
        <StrongAndText title={i18n.t('components.validator.voting_power') + ': '}>
          <div>{validatorData.power}</div>
        </StrongAndText>
      </FooterWrapper>
    )
  }

  return (
    <GenericCardWrapper {...props} footer={<Footer />}>
      <CardItemTitle>
        <BreakWord>{validatorData.address}</BreakWord>
      </CardItemTitle>
    </GenericCardWrapper>
  )
}


const FooterWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`
