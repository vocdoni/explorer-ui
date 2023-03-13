import { Skeleton } from '@components/blocks/skeleton';
import { Card } from '@components/elements/cards';
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex';
import { Column, ColumnDiv } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { colors } from '@theme/colors';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface IListPageTemplateProps {
  title: string;
  subtitle: string;
}

/**
 * Used as template for "lists" pages, for ex: page of entities or
 * page of processes.
 * @param
 * @returns
 */
export const ListPage = ({ title, subtitle }: IListPageTemplateProps) => {
  return (
    <div>
      <Typography variant={TypographyVariant.H4} color={colors.text} margin="0px auto auto">
        <strong>{title}</strong>
      </Typography>
      <Typography variant={TypographyVariant.Small} color={colors.lightText}>
        {subtitle}
      </Typography>
    </div>
  );
};

export const InlineTitleChildrenContainer = ({ title, children }: { title: ReactNode; children?: ReactNode }) => {
  return (
    <TopDiv>
      {title}
      {children}
    </TopDiv>
  );
};

export const TopDiv = styled(ColumnDiv)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 10px 0 10px;

  @media ${({ theme }) => theme.screenMin.tablet} {
    flex-direction: row;
  }
`;

export const renderSkeleton = (skeletonItems) => {
  return (
    <Column>
      {Array(skeletonItems)
        .fill(0)
        .map((value, index: number) => (
          <Card key={index}>
            <Skeleton />
          </Card>
        ))}
    </Column>
  );
};
