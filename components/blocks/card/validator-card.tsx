import {
  CardItemTitle,
  GenericCardWrapper,
  GenericCardWrapperProps,
} from '@components/elements/card-generic'
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

  const Footer = () => {
    return (
      <FooterWrapper>
        <Subtitle>
          <div className="title">
            {i18n.t('components.validator.Pubkey')} {': '}
          </div>
          <CopyButton
            color={theme.textAccent1}
            text={validatorData.pubKey}
            toCopy={validatorData.pubKey}
          ></CopyButton>
        </Subtitle>
        <Subtitle>
          <div className="title">
            {i18n.t('components.validator.voting_power')} {': '}
          </div>
          <div>{validatorData.power}</div>
        </Subtitle>
      </FooterWrapper>
    )
  }

  return (
    <GenericCardWrapper {...props} footer={<Footer />}>
      <CardItemTitle>{validatorData.address}</CardItemTitle>
    </GenericCardWrapper>
  )
}

const Subtitle = styled.div`
  color: ${(props) => props.theme.lightText};
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;

  & > .title {
    color: ${(props) => props.theme.text};
    font-weight: bold;
  }
`

const FooterWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`