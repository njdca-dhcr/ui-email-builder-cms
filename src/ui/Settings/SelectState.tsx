import React, { FC } from 'react'
import { Heading, Paragraph } from 'src/ui/Layout'
import { Select } from '../Select'

export const SelectState: FC = () => {
  return (
    <>
      <Heading element="h2" subheading>
        Select State
      </Heading>
      <Select
        labelId="string"
        onChange={() => {
          console.log('onChange')
        }}
        options={[]}
        value="string"
      />
    </>
  )
}
