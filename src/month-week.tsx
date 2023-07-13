import { Grid, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { useCalendarContext } from './context'
import { CalendarMonthStyles } from './types'

export function CalendarWeekDJ<TDate, TLocale>() {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles
  const context = useCalendarContext<TDate, TLocale>()

  const weekdays = context.adapter.weekdays(context.weekdayFormat)

  return (
    <Grid sx={styles.week}>
      {weekdays.map((weekday, i) => (
        <Text key={`${weekday}-${i}`} sx={styles.weekday}>
          {weekday}
        </Text>
      ))}
    </Grid>
  )
}
