import * as React from 'react'
import { Button, ButtonProps, useStyleConfig } from '@chakra-ui/react'
import { useCalendarDay } from './useCalendarDay'
import { format } from 'date-fns'

export type CalendarDay = React.PropsWithChildren<ButtonProps>

export function CalendarDay({ children, ...props }: CalendarDay) {
  const { day, interval, variant, isDisabled, onSelectDates } = useCalendarDay()
  const styles = useStyleConfig('CalendarDay', { variant, interval })

  return (
    <Button
      aria-current={variant === 'selected' ? 'date' : false}
      aria-label={format(day, 'MM-d')}
      onClick={() => onSelectDates(day)}
      isDisabled={isDisabled}
      sx={{ ...styles, ...props }}
      {...props}
    >
      {children || format(day, 'd')}
    </Button>
  )
}
