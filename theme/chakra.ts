import { extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'

const { Checkbox, Progress } = chakraTheme.components

const chakraDefaultTheme = extendBaseTheme({
  components: {
    Checkbox,
    Progress
  },
})

export default chakraDefaultTheme;
