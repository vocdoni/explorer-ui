import styled, { DefaultTheme } from 'styled-components';
import Link from 'next/link';
import { Column, ColumnProps } from './grid';
import { Skeleton } from '../blocks/skeleton';

export type CardProps = ColumnProps & {
  border?: boolean;
};

type StatusCardProps = ColumnProps & {
  title: string;
  rightText?: string;
  href?: string;
  skeleton?: boolean;
};

export enum PageCardHeaderVariant {
  Image = 'image',
  Text = 'text',
}

const PageCardHeaderVariantStyle = {
  [PageCardHeaderVariant.Image]: () => `
    & > img {
      width: 100%;
    }
  `,
  [PageCardHeaderVariant.Text]: (theme: DefaultTheme) => `
    padding: 40px;
    border-bottom: solid 1px ${theme.lightBorder};

    @media ${theme.screenMax.mobileL} {
      padding: 30px 20px;
    }
`,
};

export const PageCard = styled.div`
  background-color: ${({ theme }) => theme.white};
  padding: 32px;
  border-radius: 16px;
`;

export const PageCardHeader = styled.div<{ variant?: PageCardHeaderVariant }>`
  margin: -32px -32px 20px;
  max-height: 340px;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  max-height: 250px;

  ${({ theme, variant }) => PageCardHeaderVariantStyle[variant || PageCardHeaderVariant.Image](theme)}
`;

export const Card = ({ span, sm, md, lg, xl, border, ...props }: CardProps) => (
  <Column {...{ span, sm, md, lg, xl }}>
    <CardDiv border={border}>{props.children}</CardDiv>
  </Column>
);

export const StatusCard = ({ span, sm, md, lg, xl, skeleton, ...props }: StatusCardProps) => {
  const children = props.children;

  const Body = () => (
    <>
      <TopDiv>
        <StatusCardTitle>{props.title}</StatusCardTitle>
        {props.rightText ? <RightLink>{props.rightText}</RightLink> : null}
      </TopDiv>
      {children}
    </>
  );
  return (
    <Column {...{ span, sm, md, lg, xl }}>
      <CardDiv>
        {skeleton ? (
          <Skeleton />
        ) : props.href ? (
          <Link href={props.href}>
            <Body />
          </Link>
        ) : (
          <Body />
        )}
      </CardDiv>
    </Column>
  );
};

// Styles

export const CardDiv = styled.div<{ border?: boolean }>`
  padding: 11px 20px;
  background: ${(props) => props.theme.white};
  border: ${({ theme, border }) => (border ? `solid 2px ${theme.lightBorder}` : 'none')};
  box-shadow: 0px 3px 3px rgba(180, 193, 228, 0.35);
  border-radius: 16px;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StatusCardTitle = styled.h5`
  color: ${(props) => props.theme.darkLightFg};
  font-weight: normal;
  margin: 10px 0;
  line-height: 20px;
`;
const RightLink = styled.div`
  margin: 10px 0;
  line-height: 20px;
`;
