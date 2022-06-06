import { extendTheme } from '@chakra-ui/react'
import { Calendar } from './calendar'
import { CalendarControl } from './controls'
import { CalendarDay } from './day'
import { CalendarMonth } from './month'
import { CalendarYear } from './year'

export const theme = extendTheme({
  components: {
    Calendar,
    CalendarMonth,
    CalendarYear,
    CalendarDay,
    CalendarControl,
  },
})
