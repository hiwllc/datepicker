import * as React from 'react'
import format from 'date-fns/format'
import { Button, useStyleConfig } from '@chakra-ui/react'
import { CalendarDate } from './types'

export type Day = React.PropsWithChildren<{
  day: CalendarDate
  variant?: DayVariant
  disabled?: boolean
  onSelectDate: (date: CalendarDate) => void
}>


type LiteralUnion<T extends U, U = string> = T | (U & {});
export type DayVariant = LiteralUnion<"selected" | "range" | "outside" | "today"> | undefined;


export function Day({ day, variant, disabled, onSelectDate }: Day) {
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
      {format(day, 'd')}
    </Button>
  )
}
