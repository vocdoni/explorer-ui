import React, { ReactNode } from 'react';

import { UseAlertMessageProvider } from '@hooks/message-alert';
import { UseLoadingAlertProvider } from '@hooks/loading-alert';
import { ChakraProvider } from '@chakra-ui/provider';
import chakraDefaultTheme from '@theme/chakra';
import { ExtendedSDKClient } from '@lib/client';
import { EnvOptions } from '@vocdoni/sdk';
import { ClientProvider } from '@vocdoni/chakra-components';

interface IDefaultProvidersProps {
  children: ReactNode;
}

export const DefaultProviders = ({ children }: IDefaultProvidersProps) => {
  const environment = process.env.VOCDONI_ENVIRONMENT as EnvOptions;

  const sdkClient = new ExtendedSDKClient({
    env: environment,
  });

  return (
    <UseAlertMessageProvider>
      <UseLoadingAlertProvider>
        <ChakraProvider resetCSS={false} theme={chakraDefaultTheme}>
          <ClientProvider locale={null} client={sdkClient}>
            {children}
          </ClientProvider>
        </ChakraProvider>
      </UseLoadingAlertProvider>
    </UseAlertMessageProvider>
  );
};
