import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { useCalendarContext } from './context'
import { CalendarControlStyles } from './types'

type CalendarPrevButtonProps = {
  as?: ({ onClick }: { onClick: VoidFunction }) => ReactElement | null
}

export function CalendarPrevButton<TDate, TLocale>({
  as,
}: CalendarPrevButtonProps) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const context = useCalendarContext<TDate, TLocale>()

  if (as) {
    return as({ onClick: context.prevMonth })
  }

  return (
    <Button onClick={context.prevMonth} sx={styles.button}>
      &#8592;
    </Button>
  )
}
