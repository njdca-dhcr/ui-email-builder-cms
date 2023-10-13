export interface Features {
  settings: () => boolean
}

export const availableFeatures: Features = {
  settings: () => true,
}
