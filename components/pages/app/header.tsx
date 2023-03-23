import React, { MouseEvent, ReactNode, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Unless } from 'react-if';

import { useTranslation } from 'react-i18next';

import {
  HOME_PATH,
  ORGANIZATIONS_PATH,
  PROCESSES_PATH,
  BLOCKS_PATH,
  TRANSACTIONS_PATH,
  VALIDATORS_PATH,
  STATS_PATH,
  TOOLS_PATH,
  VERIFY,
} from '@const/routes';

import { MenuIcon } from '@components/blocks/menu-icon';
import { useIsMobile } from '@hooks/use-window-size';

import { sizes } from '../../../theme/sizes';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { Button } from '@components/elements/button';
import LanguageSelector from '@components/blocks/language-selector';
import { colors } from '@theme/colors';

interface IHeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: IHeaderProps) => {
  const isMobile = useIsMobile();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { i18n } = useTranslation();
  const env = process.env.VOCDONI_ENVIRONMENT;

  let headerUrl;
  switch (env) {
    case 'prod':
      headerUrl = '/images/logo-header.png';
      break;
    case 'stg':
      headerUrl = '/images/logo-header-stg.png';
      break;
    default:
      headerUrl = '/images/logo-header-dev.png';
      break;
  }

  const LINKS: HeaderLink[] = [
    {
      name: i18n.t('links.organizations'),
      url: ORGANIZATIONS_PATH,
    },
    {
      name: i18n.t('links.processes'),
      url: PROCESSES_PATH,
    },
    {
      name: i18n.t('links.blocks'),
      url: BLOCKS_PATH,
    },
    {
      name: i18n.t('links.transactions'),
      url: TRANSACTIONS_PATH,
    },
    {
      name: i18n.t('links.validators'),
      url: VALIDATORS_PATH,
    },
    {
      name: i18n.t('links.stats'),
      url: STATS_PATH,
    },
    {
      name: i18n.t('links.tools'),
      url: TOOLS_PATH,
    },
  ];

  const RIGHT_LINKS: HeaderLink[] = [
    {
      name: i18n.t('links.verify_vote'),
      url: VERIFY,
    },
  ];

  return (
    <>
      <HeaderContainer>
        <ListContainer>
          <HomeLink target="_self" href={HOME_PATH} passHref>
            <img src={headerUrl} alt="Vocdoni" />
          </HomeLink>

          <MenuItemsContainer>
            <Unless condition={isMobile}>
              {LINKS.map((link) => (
                <LinkItem {...link} key={link.name}>
                  {link.name}
                </LinkItem>
              ))}
            </Unless>
          </MenuItemsContainer>
        </ListContainer>

        <MobileMenuContainer showMenu={openMobileMenu}>
          {[...LINKS, ...RIGHT_LINKS].map((link) => (
            <MenuItem key={link.name}>
              <LinkItem {...link} onClick={() => setOpenMobileMenu(false)}>
                <Typography variant={TypographyVariant.Subtitle1}>{link.name}</Typography>
              </LinkItem>
            </MenuItem>
          ))}
          <LanguageSelector bg={'white'} size={'lg'} color={colors.blueText} />
          <MobileMenuActionsContainer onClick={() => setOpenMobileMenu(false)}>{children}</MobileMenuActionsContainer>
        </MobileMenuContainer>

        {isMobile && <MenuIcon menuState={openMobileMenu} onClickMenu={setOpenMobileMenu} />}

        {!isMobile && (
          <RightContainer>
            <LanguageSelector />
            {RIGHT_LINKS.map((link, i) => (
              <CTAButton key={i} url={link.url}>
                {link.name}
              </CTAButton>
            ))}
            {children}
          </RightContainer>
        )}
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  z-index: 100;
  min-height: 50px;
  position: fixed;
  top: 0;
  padding: 10px 0 10px;

  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  font-size: 16px;

  background-color: #fff;

  & a {
    font-size: 16px;
  }
`;

const ListContainer = styled.div`
  padding: 0 20px;
  display: flex;
  // width: 100%;
  justify-content: flex-start;
  align-items: center;

  max-width: ${sizes.laptopL * 0.8}px;

  @media ${({ theme }) => theme.screenMin.tablet} {
    padding: 0 ${({ theme }) => theme.margins.desktop.horizontal};
  }
`;

const RightContainer = styled.div`
  padding: 0 ${({ theme }) => theme.margins.mobile.horizontal};
  display: flex;
  gap: 8px;

  @media ${({ theme }) => theme.screenMin.tablet} {
    padding: 0 ${({ theme }) => theme.margins.mobile.horizontal};
  }

  @media ${({ theme }) => theme.screenMax.mobileL} {
    display: none;
  }
`;

const MenuItemsContainer = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: center;
`;

const ListItem = styled.div`
  margin: 0 16px;

  a {
    color: ${({ theme }) => theme.text};
  }

  a:hover {
    text-decoration: underline;
  }
`;

const HomeLink = styled(Link)`
  cursor: pointer;

  & > img {
    margin-top: 6px;
    max-height: 45px;
    max-width: 200px;
  }
`;
const MobileMenuActionsContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 20px;

  & > a {
    width: 100%;
  }
`;
const MobileMenuContainer = styled.div<{ showMenu: boolean }>`
  display: none;
  background: linear-gradient(180deg, #f0ffde 20.98%, #e0ffff 73.1%);
  position: fixed;
  width: 100%;
  top: 0;
  overflow: hidden;
  height: 0;
  z-index: -1;

  @media ${({ theme }) => theme.screenMax.tablet} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    visibility: ${({ showMenu }) => (showMenu ? 'visible' : 'hidden')};
    height: ${({ showMenu }) => (showMenu ? '100vh' : '0')};
    top: ${({ showMenu }) => (showMenu ? '0' : '-100%')};

    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
  }
`;

const MenuItem = styled.div`
  color: ${({ theme }) => theme.blueText};
`;

interface HeaderLink {
  name: string;
  url: string;
  external?: boolean;
}

interface ILinkItemProps {
  url: string;
  children: ReactNode;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const LinkItem = ({ url, onClick, children }: ILinkItemProps) => (
  <ListItem>
    <Link onClick={onClick} href={url} passHref>
      {children}
    </Link>
  </ListItem>
);

const CTAButton = ({ url, children }: ILinkItemProps) => {
  return (
    <Button small positive>
      <CTA href={url} passHref>
        {children}
      </CTA>
    </Button>
  );
};

const CTA = styled(Link)`
  color: inherit;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 12.8px;
  line-height: 150%;
`;
