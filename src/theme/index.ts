import { extendTheme } from '@chakra-ui/react'
import { Calendar } from './calendar'
import { Month } from './month'
import { Day } from './day'
import { CalendarControl } from './controls'

export const theme = extendTheme({
  components: {
    Calendar,
    Month,
    Day,
    CalendarControl,
  },
})
