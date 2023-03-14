import styled from 'styled-components';
import Link from 'next/link';
import { Column, ColumnProps } from '../elements/grid';
import { ReactNode } from 'react';
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '../elements/flex';
import React from 'react';
import { BreakWord, BreakWordAll, ItemDate } from '@components/elements/styled-divs';

export const GenericListItemWithBadge = ({
  title,
  dateText,
  link,
  topLeft,
  badge,
  children,
  span,
  sm,
  md,
  lg,
  xl,
}: ColumnProps & {
  title?: string;
  dateText?: string;
  link?: string;
  topLeft: ReactNode;
  badge: ReactNode;
  children?: ReactNode;
}) => {
  const childrenData = () => {
    return (
      <ListItemDiv>
        <TopDiv>
          <FlexContainer alignItem={FlexAlignItem.Center} justify={FlexJustifyContent.Center}>
            <BreakWord>{topLeft}</BreakWord>
          </FlexContainer>
          {badge}
        </TopDiv>

        {title && (
          <VoteListItemTitle>
            <BreakWord>{title}</BreakWord>
          </VoteListItemTitle>
        )}
        {dateText ? (
          <ItemDate>
            <BreakWordAll>{dateText}</BreakWordAll>
          </ItemDate>
        ) : null}
        <BreakWordAll>{children ? children : null}</BreakWordAll>
      </ListItemDiv>
    );
  };

  return (
    <Column {...{ span, sm, md, lg, xl }}>
      {link ? (
        <LinkCardContainer>
          <Link href={link ?? ''} passHref>
            {childrenData()}
          </Link>
        </LinkCardContainer>
      ) : (
        childrenData()
      )}
    </Column>
  );
};

const LinkCardContainer = styled.div`
  & > a {
    color: inherit;
  }
`;

// Styles
const ListItemDiv = styled.div`
  width: 100%;
  padding: 20px 20px 10px;
  background: ${(props) => props.theme.white};
  box-shadow: 0 3px 3px rgba(180, 193, 228, 0.35);
  border-radius: 16px;
  box-sizing: border-box;

  &:hover {
    background-color: ${(props) => props.theme.lightBg};
  }
  &:active {
    background-color: ${(props) => props.theme.lightBg2};
  }
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const VoteListItemTitle = styled.h3`
  margin-top: 16px;
  margin-bottom: 6px;
  color: ${(props) => props.theme.text};
  font-weight: normal;
`;
