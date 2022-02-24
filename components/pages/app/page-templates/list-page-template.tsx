import { Typography, TypographyVariant } from "@components/elements/typography"
import { colors } from "@theme/colors"
import { ReactNode } from "react"

interface IListPageTemplateProps {
    title: string
    subtitle: string
    children: ReactNode
    
}

/**
 * Used as template for "lists" pages, for ex: page of entities or 
 * page of processes. 
 * @param 
 * @returns 
 */
export const ListPageTemplate = ({ title, subtitle, children
}: IListPageTemplateProps) => { 

  return (
    <>
      <Typography variant={TypographyVariant.H3} color={colors.blueText}>
          {title}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {subtitle}
        </Typography>
        {children}
    </>
  )
}