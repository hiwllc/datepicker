import * as React from 'react'
import format from 'date-fns/format'
import { Button, useStyleConfig } from '@chakra-ui/react'
import { CalendarDate } from './types'

export interface Day
  extends React.PropsWithChildren<{
    day: CalendarDate
    variant?: 'selected' | 'range' | 'outside' | 'today'
    disabled?: boolean
    onSelectDate: (date: CalendarDate) => void
  }> {}

export function Day({ day, variant, disabled, onSelectDate, children }: Day) {
  const styles = useStyleConfig('CalendarDay', { variant })
  // console.log({ variant, day })

  return (
    <Button
      aria-label={format(day, 'MM-d')}
      onClick={() => onSelectDate(day)}
      sx={styles}
      isDisabled={disabled}
      aria-current={variant === 'selected' ? 'date' : false}
    >
      {children || format(day, 'd')}
    </Button>
  )
}
