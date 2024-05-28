import React from 'react';
import styled, { useTheme } from 'styled-components';
import Link from 'next/link';
import { HOME_PATH } from '@const/routes';
import { useTranslation } from 'next-i18next';

export const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const LINKS: HeaderLink[] = [
    {
      url: 'https://blog.vocdoni.io/',
      name: t('links.blog'),
      external: true,
      logged: true,
      guest: true,
    },
    {
      url: 'https://developer.vocdoni.io',
      name: t('links.docs'),
      external: true,
      logged: true,
      guest: true,
    },
    {
      url: 'https://discord.gg/sM7UhAGY53',
      name: t('links.help'),
      external: true,
      logged: true,
      guest: true,
    },
    {
      // url: ABOUT_PATH,
      url: 'https://vocdoni.io',
      name: t('links.about'),
      external: false,
      logged: false,
      guest: true,
    },
    {
      url: 'https://discord.gg/sQCxgYs',
      name: t('links.support'),
      external: true,
      logged: true,
      guest: false,
    },
  ];

  const links = LINKS.filter((link) => link.guest);

  return (
    <Container>
      <LogoSection>
        <HomeLink href={HOME_PATH} passHref target="_self">
          <img src="/images/logo-classic.svg" alt="Vocdoni" />
        </HomeLink>
      </LogoSection>

      <LinksSection color={theme.lightText}>
        {links.map(({ url, name, external }, i) => (
          <NavItem key={i}>
            <FooterLink href={url} passHref target={external ? '_blank' : '_self'}>
              {name}
            </FooterLink>
          </NavItem>
        ))}
      </LinksSection>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  font-size: 13px;
  height: 90px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.screenMax.mobileL} {
    height: auto;
    position: relative;
    margin-top: -100px;
  }
`;

const NavItem = styled.div`
  margin-right: 30px;

  @media ${({ theme }) => theme.screenMax.mobileL} {
    text-align: center;
  }
`;

const LogoSection = styled.div`
  margin-left: 40px;
  img {
    max-height: 35px;
  }

  @media ${({ theme }) => theme.screenMax.mobileL} {
    margin: 20px auto;
  }
`;

const LinksSection = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.screenMax.mobileL} {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
`;

const FooterLink = styled(Link)`
  line-height: 30px;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const HomeLink = styled(Link)`
  cursor: pointer;

  & > img {
    margin-right: 20px;
    height: 54px;
  }
`;

interface HeaderLink {
  name: string;
  url: string;
  external?: boolean;
  logged?: boolean;
  guest?: boolean;
}
