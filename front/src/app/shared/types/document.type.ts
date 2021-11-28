export enum DocumentType {
  PDF = 'PDF',
  Text = 'Text',
  Music = 'Music',
  Video = 'Video'
}
export type Document = {
  id: bigint,
  name: string,
  type: DocumentType,
  path: string,
  date: Date
}
