import capitalize from 'lodash.capitalize'
import { DisclaimerValue } from 'src/appTypes'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { AreaKind, stateById } from 'src/utils/statesAndTerritories'

export const defaultDisclaimerValue = (): DisclaimerValue => {
  const stateAbbreviation = appModeAsStateAbbreviation() ?? 'US'
  const state = stateById(stateAbbreviation)
  const title =
    state.kind === AreaKind.Federal ? state.name : `${capitalize(state.kind)} of ${state.name}`

  return {
    content: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Do not reply to this email. Its inbox is not monitored and any emails received will not be responded to.',
          },
        ],
      },
      { type: 'paragraph', children: [{ text: '' }] },
      {
        type: 'paragraph',
        children: [
          {
            text: `The ${title} is committed to preventing fraudulent emails. Emails from ${state.name}'s Division of Unemployment Insurance will always contain your full name and will be sent by no-reply@dol.nj.gov`,
          },
        ],
      },
      { type: 'paragraph', children: [{ text: '' }] },
      {
        type: 'paragraph',
        children: [
          {
            text: `If you'd like to get in contact with the ${state.name}'s Division of Unemployment Insurance, you can call (732) 761-2020. Phone lines are open from 8am-3pm Monday through Friday; the best time to call is at 8am.`,
          },
        ],
      },
      { type: 'paragraph', children: [{ text: '' }] },
      {
        type: 'paragraph',
        children: [
          {
            text: `This email is a new beta design created by ${state.name}'s Division of Unemployment Insurance and ${state.name}'s Office of Innovation.`,
          },
        ],
      },
      { type: 'paragraph', children: [{ text: '' }] },
      {
        type: 'paragraph',
        children: [
          {
            text: `CONFIDENTIALITY NOTICE: This email message and all attachments transmitted with it may contain ${title} legally privileged and confidential information intended solely for the use of the addressee only. If the reader of this message is not the intended recipient, you are hereby notified that any reading, dissemination, distribution, copying, or other use of this message or its attachment is prohibited. If you have received this message in error, please notify the sender immediately and delete this message.`,
          },
        ],
      },
    ],
  }
}
