import { sizes } from "@theme/sizes"
import styled from "styled-components"

export const DivWithMarginChildren = styled.div`
& > * {
  margin-right: 20px;
  margin-bottom: 20px;
}
`

export const Section = styled.section<{ background?: string }>`
  padding: 30px 0;
  ${({ background }) => (background ? `background: ${background};` : '')}
`

export const BlockContainer = styled.div`
  max-width: ${sizes.laptopL * 0.8}px;
  margin: auto;
  padding: 0 15px;
`
