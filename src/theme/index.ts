import { extendTheme } from '@chakra-ui/react'
import { CalendarContent } from './content'
import { CalendarControl } from './controls'
import { CalendarDay } from './day'
import { CalendarHeader } from './header'
import { CalendarMonth } from './month'

export const theme = extendTheme({
  components: {
    CalendarContent,
    CalendarControl,
    CalendarDay,
    CalendarHeader,
    CalendarMonth,
  },
})
