import React from 'react'
import copy from 'copy-to-clipboard'
import { useTranslation } from 'react-i18next'


import { useAlertMessage } from '@hooks/message-alert'

import { BiCopyAlt } from 'react-icons/bi'
import { IconContext } from 'react-icons'

export const CopyButton = ({ toCopy, text }: { toCopy: string, text: string }) => {
  const { i18n } = useTranslation()

  const { setAlertMessage } = useAlertMessage()
  const handleCopy = () => {
    copy(toCopy)
    setAlertMessage(i18n.t('copy.the_link_has_been_copied_to_the_clipboard'))
  }

  return (
    <div onClick={handleCopy}>
      <IconContext.Provider value={{ color: 'gray', size: '1em', style: { 'paddingLeft': '10px', 'cursor': 'pointer' } }}>
        <div>
          {text} <BiCopyAlt />
        </div>
      </IconContext.Provider>
    </div>
  )
}