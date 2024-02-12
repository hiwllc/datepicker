import { Button, ButtonProps, useStyleConfig } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { useCalendarContext } from './context'
import { useCalendarDay } from './useCalendarDay'

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
