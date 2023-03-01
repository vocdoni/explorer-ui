import { extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

const { Checkbox } = chakraTheme.components

const chakraDefaultTheme = extendBaseTheme({
  components: {
    Checkbox,
  },
})

export default chakraDefaultTheme;
