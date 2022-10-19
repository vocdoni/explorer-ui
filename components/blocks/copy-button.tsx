import React from 'react'
import copy from 'copy-to-clipboard'
import { useTranslation } from 'react-i18next'

import { useAlertMessage } from '@hooks/message-alert'

import { IoCopy } from 'react-icons/io5'
import { IconContext } from 'react-icons'

export const CopyButton = ({
  toCopy,
  text,
  size,
  style,
  color,
}: {
  toCopy: string
  text: string
  size?: string
  style?: React.CSSProperties
  color?: string
}) => {
  const { i18n } = useTranslation()

  const { setAlertMessage } = useAlertMessage()
  const handleCopy = (e) => {
    e.cancelBubble = true;
    e.stopPropagation();
    e.preventDefault();
    copy(toCopy)
    setAlertMessage(i18n.t('copy.the_link_has_been_copied_to_the_clipboard'))
  }

  return (
    <div onClick={handleCopy}>
      <IconContext.Provider
        value={{
          color: color ?? 'inherit',
          size: size ?? '1em',
          style: style ?? { paddingLeft: '10px', cursor: 'pointer' },
        }}
      >
        <div>
          {text} <IoCopy />
        </div>
      </IconContext.Provider>
    </div>
  )
}

export const ReducedTextAndCopy= ({
  text,
  toCopy,
}: {
  text: string
  toCopy: string
}) => {
  const entityTxt =
  text.length < 13
      ? text
      : text.substring(0, 5) +
        '...' +
        text.substring(text.length - 4, text.length)
  return <CopyButton toCopy={toCopy} text={entityTxt} />
}

