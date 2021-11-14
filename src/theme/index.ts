import { extendTheme } from '@chakra-ui/react'
import { Calendar } from './calendar'
import { CalendarMonth } from './month'
import { CalendarDay } from './day'
import { CalendarControl } from './controls'

export const theme = extendTheme({
  components: {
    Calendar,
    CalendarMonth,
    CalendarDay,
    CalendarControl,
  },
})
