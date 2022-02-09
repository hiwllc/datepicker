import { Grid, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { addDays, format, startOfWeek } from 'date-fns'
import { useContext } from 'react'
import { CalendarContext } from './context'
import { CalendarMonthStyles } from './types'

type Weekdays = {
  weekdayFormat?: string
  locale?: Locale
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

function weekdays({ weekdayFormat = 'E', locale, weekStartsOn }: Weekdays) {
  const start = startOfWeek(new Date(), { weekStartsOn })
  return [...Array(7).keys()].map(i =>
    format(addDays(start, i), weekdayFormat, { locale })
  )
}

export function CalendarWeek() {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const { locale, weekdayFormat, weekStartsOn } = useContext(CalendarContext)
  const week = weekdays({ weekdayFormat, locale, weekStartsOn })

  return (
    <Grid sx={styles.week}>
      {week.map(weekday => (
        <Text key={weekday} sx={styles.weekday}>
          {weekday}
        </Text>
      ))}
    </Grid>
  )
}
