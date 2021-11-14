import format from 'date-fns/format'
import { Button, useStyleConfig } from '@chakra-ui/react'
import { CalendarDate } from './types'

export type Day = {
  day: CalendarDate
  variant?: 'selected' | 'range'
  onSelectDate: (date: CalendarDate) => void
}

export function Day({ day, variant, onSelectDate }: Day) {
  const styles = useStyleConfig('Day', { variant })

  return (
    <Button onClick={() => onSelectDate(day)} sx={styles}>
      {format(day, 'd')}
    </Button>
  )
}
