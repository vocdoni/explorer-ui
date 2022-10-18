import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { FaChevronRight } from 'react-icons/fa'
import { Column, ColumnProps } from '@components/elements/grid'
import Link from 'next/link'

export type GenericCardWrapperProps = ColumnProps & {
  link?: string
  top?: ReactElement
  children?: ReactElement
  footer?: ReactElement
  left?: ReactElement
}

export const GenericCardWrapper = ({
  top,
  children,
  footer,
  left,
  link,
  ...props
}: GenericCardWrapperProps) => {
  const Skeleton = () => (
    <CardItemDiv tabIndex={0}>
      {left && <CardLeft>{left}</CardLeft>}
      <CardBody>
        {top && <TopDiv>{top}</TopDiv>}
        <CenterDiv
        style={
          { margin: top ? '15px 0' : '0 0 15px 0' }
        }
        //  style={
        //   } 
          >{children}</CenterDiv>
        {footer && <FooterDiv>{footer}</FooterDiv>}
      </CardBody>
      <CardRight>
        <FaChevronRight />
      </CardRight>
    </CardItemDiv>
  )

  return (
    <Column {...props}>
      {link ? (
        <LinkCardContainer>
          <Link href={link ?? ''} passHref>
            <a href={link ?? ''}>{<Skeleton />}</a>
          </Link>
        </LinkCardContainer>
      ) : (
        <Skeleton />
      )}
    </Column>
  )
}

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
  padding: 20px 20px 10px;
  background: ${(props) => props.theme.white};
  border-radius: 16px;
  box-sizing: border-box;
  margin-bottom: 10px;
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
  margin-bottom: 8px;
`

const CenterDiv = styled.div`
  padding-left: 1px;
`

export const CardItemTitle = styled.h3`
  margin-top: 7px;
  margin-bottom: 5px;
  font-weight: bold;
`

export const CardItemSubTitle = styled.div`
  color: ${(props) => props.theme.text};
`
