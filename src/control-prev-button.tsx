import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { useCalendarContext } from './context'
import { CalendarControlStyles } from './types'
import { ReactElement } from 'react'

type CalendarPrevButton = {
  as?: ({ onClick }: { onClick: VoidFunction }) => ReactElement | null
}

export function CalendarPrevButtonDJ<TDate, TLocale>({
  as,
}: CalendarPrevButton) {
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
