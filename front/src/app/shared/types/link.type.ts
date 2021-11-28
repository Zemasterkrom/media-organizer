export const enum LinkType {
  YouTube = "YouTube",
  Dailymotion = "Dailymotion"
}

export type Link = {
  id: bigint,
  name: string,
  type: LinkType,
  url: string,
  date: Date
}
