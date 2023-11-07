export const buildSubComponentPartKey = (subcomponentId: string, id: string): string =>
  [subcomponentId, id].join('-')
