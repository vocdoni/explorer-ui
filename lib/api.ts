import { IProcessDetails, VotingApi } from 'dvote-js'
import { BigNumber, providers } from 'ethers'
import { GatewayPool } from '@vocdoni/react-hooks/node_modules/dvote-js'

// VOCDONI API wrappers

/** Fetches the process parameters and metadata for the given entity */
export async function getProcesses(
  entityId: string,
  pool: GatewayPool
): Promise<IProcessDetails[]> {
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

export async function getProcessInfo(processId: string, pool: GatewayPool): Promise<IProcessDetails> {
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
