import React, { FC } from 'react'

interface MoreInfoImageProps {
  alt: string
  src: string
}

export const MoreInfoImage: FC<MoreInfoImageProps> = ({ alt, src }) => {
  return <img className="more-info-image" alt={alt} src={src} />
}
