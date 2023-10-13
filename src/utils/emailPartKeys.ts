export const buildComponentKey = (id: string): string => id

export const buildSubComponentKey = (componentId: string, id: string): string =>
  [componentId, id].join('-')

export const buildSubComponentPartKey = (subcomponentId: string, id: string): string =>
  [subcomponentId, id].join('-')
