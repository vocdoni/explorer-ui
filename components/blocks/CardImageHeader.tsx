import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { SectionText, SectionTitle, TextAlign } from '@components/elements/text';
import { PageCardHeader } from '@components/elements/cards';
import { Column, Grid } from '@components/elements/grid';
import { BreakWord } from '@components/elements/styled-divs';

interface ICardImageHeader {
  title: string;
  subtitle?: ReactNode;
  header?: ReactNode;
  logo?: ReactNode;
}

export const CardImageHeader = ({ title, subtitle, header, logo }: ICardImageHeader) => {
  return (
    <>
      <PageCardHeader>{header}</PageCardHeader>

      <LogoWrapper>{logo}</LogoWrapper>

      <Grid>
        <Column>
          <SectionTitle align={TextAlign.Center}>{title}</SectionTitle>
          {subtitle && (
            <SectionText align={TextAlign.Center} color="accent1">
              <BreakWord>{subtitle}</BreakWord>
            </SectionText>
          )}
        </Column>
      </Grid>
    </>
  );
};

const LogoWrapper = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 130px;
  height: 130px;
  display: flex;
  margin: -90px auto 10px;
  border: solid 1px ${({ theme }) => theme.white};

  & > img {
    max-height: 100%;
    max-width: 100%;
  }
`;
