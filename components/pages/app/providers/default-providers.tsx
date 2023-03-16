import React, { ReactNode } from 'react';
import { UseBlockStatusProvider, UseEntityProvider, UsePoolProvider, UseProcessProvider } from '@vocdoni/react-hooks';
import { EthNetworkID, VocdoniEnvironment } from 'dvote-js';

import { UseAlertMessageProvider } from '@hooks/message-alert';
import { UseLoadingAlertProvider } from '@hooks/loading-alert';
import { UseProcessWrapperProvider } from '@hooks/use-process-wrapper';
import { ChakraProvider } from '@chakra-ui/provider';
import chakraDefaultTheme from '@theme/chakra';
import { ExtendedSDKClient } from '@lib/client';
import { EnvOptions } from '@vocdoni/sdk';
import { ClientProvider } from '@vocdoni/react-components';

interface IDefaultProvidersProps {
  children: ReactNode;
}

export const DefaultProviders = ({ children }: IDefaultProvidersProps) => {
  const bootnodeUri = process.env.BOOTNODES_URL;
  const networkId = process.env.ETH_NETWORK_ID as EthNetworkID;
  const environment = process.env.VOCDONI_ENVIRONMENT as VocdoniEnvironment;
  const discoveryTimeout = Number(process.env.DISCOVERY_TIMEOUT);
  const discoveryPoolSize = Number(process.env.DISCOVERY_POOL_SIZE);

  const sdkClient = new ExtendedSDKClient({
    env: environment as EnvOptions,
  });

  return (
    <UseAlertMessageProvider>
      <UseLoadingAlertProvider>
        <UsePoolProvider
          bootnodeUri={bootnodeUri}
          networkId={networkId}
          environment={environment}
          discoveryTimeout={discoveryTimeout}
          minNumGateways={discoveryPoolSize}
        >
          <UseBlockStatusProvider>
            <UseProcessProvider>
              <UseProcessWrapperProvider>
                <UseEntityProvider>
                  <ChakraProvider resetCSS={false} theme={chakraDefaultTheme}>
                    <ClientProvider client={sdkClient}>{children}</ClientProvider>
                  </ChakraProvider>
                </UseEntityProvider>
              </UseProcessWrapperProvider>
            </UseProcessProvider>
          </UseBlockStatusProvider>
        </UsePoolProvider>
      </UseLoadingAlertProvider>
    </UseAlertMessageProvider>
  );
};
