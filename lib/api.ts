import { ProcessDetails, ProcessSummary, Random, VochainProcessStatus, Voting, VotingApi } from 'dvote-js'
import { BigNumber, providers } from 'ethers'
import { GatewayPool } from "dvote-js"

/**
 * Used to fetch directly with the active gateway a method that is not
 * wrapped on dvote-js, example `getProcessCount`
 * @returns Response to json
 */
export async function fetchMethod (
  pool: GatewayPool, 
  {method, params}: {
    method: string,
    params: any
  }
) : Promise<any> {
  let url = pool.activeGateway.dvoteUri
  return fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: Random.getHex().substr(2, 10),
      request: {
        method: method,
        timestamp: Math.floor(Date.now() / 1000),
        ...params
      },
    }),
  } as any)
  .then((response) => {
    return response.json()
  })
}

// VOCDONI API wrappers

/** Fetches the process parameters and metadata for the given entity */
export async function getProcesses(
  entityId: string,
  pool: GatewayPool
): Promise<ProcessDetails[]> {
  try {
    const list = await getProcessList(entityId, pool);
    const allProcess = list.map((processId) =>
      getProcessInfo(processId, pool)
    );
    const allProcessesInformation = await Promise.allSettled(allProcess);
    const sanitizeProccesses = (p) => {
      if (p.status === 'fulfilled') return p.value;
    };
    return allProcessesInformation.map(sanitizeProccesses);
  } catch (err) {
    if (err?.message?.includes('Key not found')) return [];
    throw err;
  }
}

export async function getProcessInfo(processId: string, pool: GatewayPool): Promise<ProcessDetails> {
  return VotingApi.getProcess(processId, pool)
}

/** Returns the list of process id's */
export async function getProcessList(entityId: string, pool: GatewayPool): Promise<string[]> {
  let result: string[] = []
  let from = 0

  while (true) {
    const processList = await VotingApi.getProcessList({ entityId, from }, pool)
    if (processList.length == 0) return result

    result = result.concat(processList.map(id => '0x' + id))
    from += processList.length
  }
}