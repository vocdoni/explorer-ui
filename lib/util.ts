import { ElectionStatusEnum } from '@vocdoni/sdk'

export const areAllNumbers = (slice: any[]) => {
  for (let i = 0; i < slice.length; i++) {
    if (typeof slice[i] !== 'number') {
      return false;
    }
  }
  return true;
}

export function limitedText(str: string, maxLength = 60): string {
  if (!str || !str.length || str.length < maxLength) return str;

  return str.substr(0, maxLength) + '...';
}


/** Transforms a CSS hex value like #F7F7F7 into an rgba() component */
export function hexToRgbA(hex: string, opacity = 1): string {
  if (opacity > 1) opacity = 1
  else if (opacity < 0) opacity = 0

  if (!hex.match(/^#?([A-Fa-f0-9]{3}){1,2}$/)) throw new Error("Invalid hex value")

  hex = hex.replace("#", "")
  if (hex.length == 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * @param address - address to modify
 * @param slashIndex - number of letters to show at beginning of address
 * @returns formatted address
 */
export function shortAddress(address: string, slashIndex = 15): string {
  // An ethereum address has 42 characters
  return address.slice(0, slashIndex) + '...' + address.slice(38, 42);
}

export const importedRowToString = (row: string[], entityId: string): string => {
  return row.reduce((i, j) => { return i + j }) + entityId
}

/** Waits for a Vochain block, multiplied by the given factor (by default, 1) */
export function waitBlockFraction(factor = 1) {
  const delay = parseInt(process.env.BLOCK_TIME) * 1000 * factor

  return new Promise((resolve) =>
    setTimeout(resolve, Math.floor(delay))
  )
}

export enum VoteStatus {
  Unknown = -1,
  Active,
  Paused,
  Ended,
  Canceled,
  Upcoming,
}

export const getVoteStatus = (
  status: ElectionStatusEnum,
  initDate: Date,
  endDate: Date): VoteStatus => {

  if (status === undefined || initDate === undefined) return VoteStatus.Unknown
  const now = new Date();
  switch (status) {
    case ElectionStatusEnum.READY:
      if (initDate > now) return VoteStatus.Upcoming
      if (now > endDate) return VoteStatus.Ended
      return VoteStatus.Active

    case ElectionStatusEnum.ENDED:
      return VoteStatus.Ended

    case ElectionStatusEnum.PAUSED:
      return VoteStatus.Paused

    case ElectionStatusEnum.CANCELED:
      return VoteStatus.Canceled

    case ElectionStatusEnum.RESULTS:
      return VoteStatus.Ended

    default:
      return VoteStatus.Unknown
  }
}


export function hasDuplicates<T>(values: T[]): boolean {
  const seen: T[] = []
  for (const v of values) {
    if (seen.includes(v)) return true
    seen.push(v)
  }
  return false
}

/** Convert byte array to hex string */
export const byteArrayToHex = (bytes: Uint8Array): string =>
  bytes instanceof Uint8Array ? Buffer.from(bytes).toString("hex") : bytes

/** Iterate an object and convert all Uint8Array values to hex */
export const objectBytesArrayToHex = (obj: any):void => {
  for (const k in obj) {
    if (typeof obj[k] == 'object' && obj[k] !== null) {
      if (obj[k] instanceof Uint8Array) {
        obj[k] = byteArrayToHex(obj[k])
      }
      else {
        objectBytesArrayToHex(obj[k])
      }
    }
  }
}

/** Used to test if a string is base64 encoded. Used by b64ToHex*/
const regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

/** If is a base64 string return hex bytes */
export const b64ToHex = (b64String: string): string =>
  regex.test(b64String) ? Buffer.from(b64String, 'base64').toString('hex') : b64String

/** Iterate an object and convert all base64 strings to hex
 *
 * It check if is a string and can be converted to a regex.
*/
export const objectB64StringsToHex = (obj: any, ignoreKeys? : string[]):void => {
  for (const k in obj) {
    if (ignoreKeys != null && ignoreKeys.indexOf(k) > -1 ) continue;
    if (typeof obj[k] === "string" && regex.test(obj[k])) {
      try{
        obj[k] = b64ToHex(obj[k])
      } catch (e) {
        console.debug("DEBUG", "Can't convert (may be not a b64 string)", k, obj[k])
      }
    }
    else if (typeof obj[k] == 'object' && obj[k] !== null) {
      objectB64StringsToHex(obj[k])
    }
  }
}

/** Used to get enum key from its value. For example on TxType */
export function getEnumKeyByEnumValue<T extends {[index:string]:string}>(myEnum:T, enumValue:string):keyof T|null {
  const keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}

export const isInValidProcessId = (processId: string): boolean =>
  !processId || !(processId.match(/^0x[0-9a-fA-F]{64}$/) || processId.match(/^[0-9a-fA-F]{64}$/));

export const isInValidEntityId = (entityId: string): boolean =>
  !entityId || !entityId.match(/^0x[0-9a-fA-F]{40}$/);

export const capitalize = (s?: string) : string => s ? s[0].toUpperCase() + s.slice(1) : null;
