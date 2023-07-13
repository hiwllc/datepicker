import { PropsWithChildren } from 'react'
import { Button, ButtonProps, useStyleConfig } from '@chakra-ui/react'
import { useCalendarDayDJ } from './useCalendarDay'
import { useCalendarContext } from './context'

export type CalendarDay = PropsWithChildren<ButtonProps>

export function CalendarDayDJ<TDate, TLocale>({
  children,
  ...props
}: CalendarDay) {
  const context = useCalendarContext<TDate, TLocale>()

  const { day, interval, variant, isDisabled, onSelectDates } =
    useCalendarDayDJ<TDate, TLocale>()
  const styles = useStyleConfig('CalendarDay', { variant, interval })

  return (
    <Button
      aria-current={variant === 'selected' ? 'date' : false}
      aria-label={context.adapter.format(day, 'monthDay')}
      onClick={() => onSelectDates(day)}
      isDisabled={isDisabled}
      sx={{ ...styles, ...props }}
      {...props}
    >
      {children || context.adapter.format(day, 'day')}
    </Button>
  )
}
