import React, { ReactElement } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { FaChevronRight } from 'react-icons/fa'
import { Column, ColumnProps } from '@components/elements/grid'
import Link from 'next/link'

export type GenericCardWrapperProps = ColumnProps & {
  link?: string
  top?: ReactElement
  children?: ReactElement
  footer?: ReactElement
  left?: ReactElement
  style?: CSSProperties
}

export const GenericCardWrapper = ({
  top,
  children,
  footer,
  left,
  link,
  style,
  ...props
}: GenericCardWrapperProps) => {
  const Skeleton = () => (
    <CardItemDiv tabIndex={0} style={style} >
      {left && <CardLeft>{left}</CardLeft>}
      <CardBody>
        {top && <TopDiv>{top}</TopDiv>}
        {/*<CenterDiv*/}
        {/*style={*/}
        {/*  { margin: top ? '8px 0' : '0 0 8px 0' }*/}
        {/*}*/}
        {/*  >{children}</CenterDiv>*/}
        <CenterDiv>{children}</CenterDiv>
        {footer && <FooterDiv>{footer}</FooterDiv>}
      </CardBody>
      <CardRight>
        <FaChevronRight />
      </CardRight>
    </CardItemDiv>
  )

  return (
    <ColumnWrapper {...props}>
      {link ? (
        <LinkCardContainer>
          <Link href={link ?? ''} passHref>
            <a href={link ?? ''}>{<Skeleton />}</a>
          </Link>
        </LinkCardContainer>
      ) : (
        <Skeleton />
      )}
    </ColumnWrapper>
  )
}

const ColumnWrapper = styled(Column)`
  margin: 10px 0;
`

const LinkCardContainer = styled.div`
  & > a {
    color: inherit;
  }
`

const CardItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${(props) => props.theme.white};
  box-sizing: border-box;
  padding: 16px 24px;
  box-shadow: rgba(180, 193, 228, 0.35) 0px 3px 3px;
  border-radius: 12px;

  &:hover {
    color: ${(props) => props.theme.textAccent1};
  }
  &:active {
    // background-color: ${(props) => props.theme.lightBg2};
    color: ${(props) => props.theme.text};
  }
  &:hover svg {
    color: ${(props) => props.theme.textAccent1};
  }
  & svg {
      color: ${(props) => props.theme.lightText};
  }
  &:focus {
    border-style: solid;
    border-color: ${(props) => props.theme.textAccent1};
    border-width: 0.15em;
  }
}
`

const CardLeft = styled.div`
  @media ${({ theme }) => theme.screenMax.tablet} {
    flex: 2;
    padding-right: 10px;
  }

  flex: 0.5;
`

const CardRight = styled.div`
  align-self: flex-center;
`

const CardBody = styled.div`
  flex: 10;
  margin: 0 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 8px;

  @media ${({ theme }) => theme.screenMax.mobileL} {
    margin: 0;
  }
`

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const CenterDiv = styled.div`
  padding-left: 1px;
`

export const CardItemTitle = styled.h3`
  margin: 0;
  font-weight: bold;
`

export const CardItemSubTitle = styled.div`
  color: ${(props) => props.theme.text};
`

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
`
