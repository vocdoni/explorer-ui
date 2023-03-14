import React, { FC } from 'react';

import { NextComponentType, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';

import Head from 'next/head';
import { Router } from 'next/router';

import { ThemeProvider } from 'styled-components';

import { DefaultLayout } from '@components/pages/app/layout/layout';
import { DefaultProviders } from '@components/pages/app/providers/default-providers';

import { FixedGlobalStyle, theme } from '../theme';
// import 'react-datetime/css/react-datetime.css'

type NextAppProps = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any, any>;
  router: Router;
};

type ChildrenProps = {
  children?: React.ReactNode;
};

const VocdoniApp: FC<NextAppProps> = ({ Component, pageProps }) => {
  const appTitle = process.env.APP_TITLE;
  const appDescr = process.env.APP_DESCRIPTION;
  const apptags = process.env.APP_TAGS;
  const commitSHA = process.env.COMMIT_SHA;

  // If the current page component defined a custom layout, use it
  const Layout: FC<ChildrenProps> = Component['Layout'] ? Component['Layout'] : DefaultLayout;
  const Providers: FC<ChildrenProps> = Component['Providers'] ? Component['Providers'] : DefaultProviders;
  if (Component['Providers']) {
    console.log('these no has default providers');
  }

  return (
    <ThemeProvider theme={theme}>
      <Providers>
        <FixedGlobalStyle />
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, max-scale=1.0" />
          <meta name="description" content={appDescr} />
          <meta name="tags" content={apptags} />
          <link rel="icon" type="image/ico" href="/images/favicon.ico" sizes="16x16" />

          <title>{appTitle}</title>
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>

        <div id="commit-sha" style={{ display: 'none' }}>
          {commitSHA}
        </div>
      </Providers>
    </ThemeProvider>
  );
};

export default VocdoniApp;
