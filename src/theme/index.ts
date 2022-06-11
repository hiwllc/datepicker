import { extendTheme } from '@chakra-ui/react'
import { Calendar } from './calendar'
import { CalendarMonth } from './month'
import { CalendarYear } from './year'
import { CalendarDay } from './day'
import { CalendarControl } from './controls'

export const theme = extendTheme({
  components: {
    Calendar,
    CalendarMonth,
    CalendarYear,
    CalendarDay,
    CalendarControl,
  },
})
