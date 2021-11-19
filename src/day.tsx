import format from 'date-fns/format'
import { Button, useStyleConfig } from '@chakra-ui/react'
import { CalendarDate } from './types'

export type Day = {
  day: CalendarDate
  variant?: 'selected' | 'range' | 'outside'
  disabled?: boolean
  onSelectDate: (date: CalendarDate) => void
}

export function Day({ day, variant, disabled, onSelectDate }: Day) {
  const styles = useStyleConfig('CalendarDay', { variant })

  return (
    <Button onClick={() => onSelectDate(day)} sx={styles} isDisabled={disabled}>
      {format(day, 'd')}
    </Button>
  )
}
