import { Button, useStyleConfig } from '@chakra-ui/react'
import { format, getDay } from 'date-fns'
import { useCalendarContext } from '../providers/calendar'
import { useCalendarDay } from '../providers/day'

export function CalendarDay() {
  const { onSelectDate } = useCalendarContext()
  const { day, variant } = useCalendarDay()
  const style = useStyleConfig('CalendarDay', { variant })
  const weekday = getDay(day)

  return (
    <Button
      sx={style}
      gridColumn={weekday + 1}
      key={format(day, 'd-M')}
      onClick={() => onSelectDate(day as Date)}
    >
      {format(day, 'd')}
    </Button>
  )
}
