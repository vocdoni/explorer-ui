import { useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/radio'
import { Box, HStack } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface RadioCardProps extends UseRadioProps { children: string }

export const RadioCard = ({ children, ...props } : RadioCardProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label' >
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='8px'
        boxSizing={"border-box"}
        borderStyle={"solid"}
        backgroundColor={"white"}
        // boxShadow='md'
        borderColor={"#d7d9e3"}
        fontWeight={"bold"}
        padding={"0 1rem"}
        textAlign={"center"}
        lineHeight={"2.5"}
        fontSize={"1rem"}
        _checked={{
          color: '#01b6f5',
          borderColor: '#01b6f5',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _hover={{
          color: '#01b6f5',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export interface IRadioOpts {
  label: string,
  key: string
}

export const RadioGroup = (
  { name, defaultValue = '', onChange, options }
    : { name, defaultValue?, onChange?: (nextValue: string) => void; options: IRadioOpts[];
}) => {
  const { i18n } = useTranslation()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: defaultValue,
    onChange: onChange,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value: value.key })
        return (
          <RadioCard key={value.key} {...radio} >
            {value.label}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
