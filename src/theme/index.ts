import { extendTheme } from '@chakra-ui/react'
import { Calendar } from './calendar'
import { Month } from './month'
import { Day } from './day'

export const theme = extendTheme({
  components: {
    Calendar,
    Month,
    Day,
  },
})
