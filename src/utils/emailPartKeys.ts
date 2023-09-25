export const buildComponentKey = (id: string): string => id

export const buildSubComponentKey = (componentId: string, id: string): string =>
  [componentId, id].join('-')
