import { ProcessDetails, Random, VotingApi } from 'dvote-js';
import { GatewayPool } from 'dvote-js';

/**
 * Used to fetch directly with the active gateway a method that is not
 * wrapped on dvote-js, example `getProcessCount`
 * @returns Response to json
 */
export async function fetchMethod(
  pool: GatewayPool,
  {
    method,
    url,
    params,
  }: {
    method: string;
    url?: string;
    params: any;
  }
): Promise<any> {
  const gwUrl = url ?? pool.activeGateway.dvoteUri;
  return fetch(gwUrl, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: Random.getHex().substr(2, 10),
      request: {
        method: method,
        timestamp: Math.floor(Date.now() / 1000),
        ...params,
      },
    }),
  } as any).then((response) => {
    return response.json();
  });
}

// VOCDONI API wrappers

export async function getProcessInfo(processId: string, pool: GatewayPool): Promise<ProcessDetails> {
  return VotingApi.getProcess(processId, pool);
}

/** Returns the list of process id's */
export async function getProcessList(entityId: string, pool: GatewayPool): Promise<string[]> {
  let result: string[] = [];
  let from = 0;

  // todo(kon): this is bad
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const processList = await VotingApi.getProcessList(
      {
        entityId,
        fromArchive: false,
        from: from,
      },
      pool
    );
    if (processList.length == 0) return result;

    result = result.concat(processList.map((id) => '0x' + id));
    from += processList.length;
  }
}
