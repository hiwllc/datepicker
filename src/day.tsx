import { PropsWithChildren } from 'react'
import { Button, ButtonProps, useStyleConfig } from '@chakra-ui/react'
import { useCalendarDay } from './useCalendarDay'
import { useCalendarContext } from './context'

export type CalendarDayProps = PropsWithChildren<ButtonProps>

export function CalendarDay<TDate, TLocale>({
  children,
  ...props
}: CalendarDayProps) {
  const context = useCalendarContext<TDate, TLocale>()

  const { day, interval, variant, isDisabled, onSelectDates } = useCalendarDay<
    TDate,
    TLocale
  >()
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
