import React, { FC, useState } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ButtonLike } from 'src/ui'
import './EditPreviewText.css'
import { ChevronDown } from 'src/ui/Svg'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'motion/react'

interface Props {
  onChange: (value: string) => void
  value: string
  readOnly?: boolean
}

export const EditPreviewText: FC<Props> = ({ onChange, readOnly, value }) => {
  const headingId = 'edit-preview-text'
  const descriptionId = 'preview-text-description'
  const characterCountId = 'preview-text-character-count'

  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="edit-preview-text">
      <div className="edit-preview-text-heading-container">
        <h3 id={headingId}>Preview Text</h3>
        <VisuallyHidden>
          <p id={descriptionId}>80-120 characters is ideal</p>
        </VisuallyHidden>
        <ButtonLike
          onClick={() => setIsExpanded(!isExpanded)}
          className={classNames('expand-collapse-button', {
            expanded: isExpanded,
            collapsed: !isExpanded,
          })}
        >
          <ChevronDown />
          <VisuallyHidden>
            {isExpanded ? 'Collapse preview text' : 'Expand preview text'}
          </VisuallyHidden>
        </ButtonLike>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="textarea"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '3.625rem' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="edit-preview-text-text-area-container"
          >
            <textarea
              aria-describedby={[descriptionId, characterCountId].join(' ')}
              aria-labelledby={headingId}
              aria-readonly={readOnly}
              readOnly={readOnly}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="This is the preview text that you can edit (80-120 characters is ideal). It gives insight into the email so that people will open it."
            />
            <p id={characterCountId}>
              {value.length}
              <VisuallyHidden>characters total</VisuallyHidden>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
