import * as React from 'react'
import format from 'date-fns/format'
import { Button, ButtonProps, useStyleConfig } from '@chakra-ui/react'
import { CalendarDate } from './types'

export type Day = React.PropsWithChildren<{
  day: CalendarDate
  variant?: 'selected' | 'range' | 'outside' | 'today'
  onSelectDate: (date: CalendarDate) => void
}> &
  ButtonProps

export function Day({ day, variant, onSelectDate, children, ...props }: Day) {
  const styles = useStyleConfig('CalendarDay', { variant })
  // console.log({ variant, day })

  return (
    <Button
      aria-current={variant === 'selected' ? 'date' : false}
      aria-label={format(day, 'MM-d')}
      {...props}
      onClick={() => onSelectDate(day)}
      sx={{ ...styles, ...props }}
    >
      {children || format(day, 'd')}
    </Button>
  )
}
