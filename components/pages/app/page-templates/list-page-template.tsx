import { FlexAlignItem, FlexContainer, FlexJustifyContent } from "@components/elements/flex"
import { Typography, TypographyVariant } from "@components/elements/typography"
import { colors } from "@theme/colors"
import { ReactNode } from "react"
import styled from "styled-components"

interface IListPageTemplateProps {
    title: string
    subtitle: string    
}

/**
 * Used as template for "lists" pages, for ex: page of entities or 
 * page of processes. 
 * @param 
 * @returns 
 */
export const ListPageTitle = ({ title, subtitle
}: IListPageTemplateProps) => { 

  return (
    <div>
      <Typography variant={TypographyVariant.H3} color={colors.blueText} margin='0px auto auto'>
          {title}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {subtitle}
        </Typography>
    </div>
  )
}

export const InlineTitleChildrenContainer=({title, children} : {title: ReactNode, children: ReactNode}) => {
  return (<TopDiv>
    <FlexContainer
      alignItem={FlexAlignItem.Center}
      justify={FlexJustifyContent.Center}
    >
      {title}
    </FlexContainer>
    {children}
  </TopDiv>)
}

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`
