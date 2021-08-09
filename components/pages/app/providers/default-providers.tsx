import React, { ReactNode } from "react";
import { UseEntityProvider, UsePoolProvider, UseProcessProvider, UseBlockStatusProvider } from '@vocdoni/react-hooks'
import { EthNetworkID, VocdoniEnvironment } from 'dvote-js'

import { UseMessageAlertProvider } from '@hooks/message-alert'
import { UseLoadingAlertProvider } from '@hooks/loading-alert'

interface IDefaultProvidersProps {
  children: ReactNode
}

export const DefaultProviders = ({ children }: IDefaultProvidersProps) => {
  const bootnodeUri = process.env.BOOTNODES_URL
  const networkId = process.env.ETH_NETWORK_ID as EthNetworkID
  const environment = process.env.VOCDONI_ENVIRONMENT as VocdoniEnvironment
  const discoveryTimeout = Number(process.env.DISCOVERY_TIMEOUT)
  const discoveryPoolSize = Number(process.env.DISCOVERY_POOL_SIZE)

  return (
    <UseMessageAlertProvider>
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
              <UseEntityProvider>
                {children}
              </UseEntityProvider>
            </UseProcessProvider>
          </UseBlockStatusProvider>
        </UsePoolProvider>
      </UseLoadingAlertProvider>
    </UseMessageAlertProvider>
  )
}