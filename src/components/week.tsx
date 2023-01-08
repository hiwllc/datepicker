import { Grid, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { addDays, format, Locale, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useCalendarContext } from '../providers/calendar'

type GetWeekdays = {
  weekday?: string
  locale?: Locale
}

function getWeekdays({ weekday = 'E', locale = enUS }: GetWeekdays) {
  const start = startOfWeek(new Date())
  return [...Array(7).keys()].map(i =>
    format(addDays(start, i), weekday, { locale })
  )
}

export function CalendarWeek() {
  const { locale, weekday } = useCalendarContext()

  const weekdays = getWeekdays({ locale, weekday })
  const styles = useMultiStyleConfig('CalendarMonth', {})

  return (
    <Grid sx={styles.week}>
      {weekdays.map((day, i) => (
        <Text key={`${day}-${i}`} sx={styles.weekday}>
          {day}
        </Text>
      ))}
    </Grid>
  )
}
