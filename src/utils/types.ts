export type TEqual<T1, T2> = (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2 ? true : false

export const objectEntries = <T extends Record<PropertyKey, unknown>, K extends keyof T, V extends T[K]>(obj: T) => {
  return Object.entries(obj) as [K, V][]
}

export const objectKeys = <T extends Record<PropertyKey, unknown>, K extends keyof T>(obj: T) => {
  return Object.keys(obj) as K[]
}
