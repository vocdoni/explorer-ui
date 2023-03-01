import React, { ChangeEvent } from 'react'
import Link from 'next/link'

import styled from 'styled-components'
import { Label } from '@components/elements/label'
import { Checkbox as ChakBox } from '@chakra-ui/react'

interface ICheckboxProps {
  id: string
  checked: boolean
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
  text: string
  href?: string
  hrefNewTab?: boolean
  labelColor?: string
}

export const Checkbox = ({ id, checked, onChange, text, href = '', labelColor = '', hrefNewTab }: ICheckboxProps) => (
  <>
    <ChakBox
      id={id}
      checked={checked}
      onChange={onChange} >
      {(href) ? (
        <Label htmlFor={id} color={(labelColor) ? labelColor : 'default'}>
          <Link href={href}>
            {text}
          </Link>
        </Label>
      ) : (
        <Label htmlFor={id} color={(labelColor) ? labelColor : 'default'}>
          {text}
        </Label>
      )}
    </ChakBox>
  </>
)
