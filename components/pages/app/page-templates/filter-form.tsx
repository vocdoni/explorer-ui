import { useTranslation } from 'react-i18next'
import { Column, Grid } from '@components/elements/grid'
import { Input } from '@components/elements/inputs'
import { FlexContainer, InlineFlex } from '@components/elements/flex'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { SubmitFilterButtons } from '@components/blocks/filters/submit-buttons'
import { ReactNode, useState } from 'react'
  
export const FilterForm = ({onEnableFilter, children}: {onEnableFilter: () => void, children: ReactNode}) => {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault()
        onEnableFilter()
      }}
    >
      {children}
    </form>
  )
}