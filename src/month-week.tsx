import { Grid, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { addDays, format, startOfWeek } from 'date-fns'
import { useContext } from 'react'
import { CalendarContext } from './context'
import { CalendarMonthStyles } from './types'

function weekdays(weekdayFormat: string, locale?: Locale) {
  const start = startOfWeek(new Date())
  return [...Array(7).keys()].map(i =>
    format(addDays(start, i), weekdayFormat, { locale })
  )
}

export function CalendarWeek() {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const { locale, weekdayFormat } = useContext(CalendarContext)
  const week = weekdays(weekdayFormat ?? 'E', locale)

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
