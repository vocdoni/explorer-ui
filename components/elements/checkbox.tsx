import React, { ChangeEvent } from 'react'
import Link from 'next/link'

import styled from 'styled-components'
import { Input } from 'react-rainbow-components';
import { Label } from '@components/elements/label'

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
  <CheckboxContainer>
    <CheckboxWrapper>
      <Input className="rainbow-m-around_medium"
             type="checkbox"
             id={id}
             checked={checked}
             onChange={onChange} />
    </CheckboxWrapper>

    {(href) ? (
      <Label htmlFor={id} color={(labelColor) ? labelColor : 'default'}>
        <Link href={href}>
          <a target={hrefNewTab ? "_blank" : "_self"}>
            {text}
          </a>
        </Link>
      </Label>
    ) : (
      <Label htmlFor={id} color={(labelColor) ? labelColor : 'default'}>
        {text}
      </Label>
    )}

  </CheckboxContainer>
)

const CheckboxWrapper = styled.div`
  flex-shrink: 0;
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  margin-right: 4px;
  margin-top: 6px;

  & > label {
    margin-left: 6px;
  }
`
