import React, { FC, ReactElement, Children } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ButtonLike, UswdsIcon } from 'src/ui'

interface Props {
  children: ReactElement[]
}

export const ShareEmailContent: FC<Props> = ({ children }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <ButtonLike aria-label="Share">
          <UswdsIcon icon="SaveAlt" />
        </ButtonLike>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="share-buttons" sideOffset={5}>
          {Children.map(children, (child) => (
            <DropdownMenu.Item asChild className="DropdownMenuItem">
              {child}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
