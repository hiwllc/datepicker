import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { useCalendarContext } from './context'
import { type CalendarControlStyles } from './types'

type CalendarNextButtonProps = {
  as?: ({ onClick }: { onClick: VoidFunction }) => ReactElement | null
}

export function CalendarNextButton<TDate, TLocale>({
  as,
}: CalendarNextButtonProps) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles

  const context = useCalendarContext<TDate, TLocale>()

  if (as) {
    return as({ onClick: context.nextMonth })
  }

  return (
    <Button onClick={context.nextMonth} sx={styles.button}>
      &#8594;
    </Button>
  )
}
