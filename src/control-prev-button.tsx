import * as React from 'react'
import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { CalendarControlStyles } from './types'

type CalendarPrevButton = {
  as?: ({ onClick }: { onClick: VoidFunction }) => JSX.Element
  skip?: 'month' | 'year'
  isSmall?: boolean
}

export function CalendarPrevButton({ as, skip, isSmall }: CalendarPrevButton) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const { prevMonth, prevYear } = React.useContext(CalendarContext)

  const clickAction = skip === 'year' ? prevYear : prevMonth
  if (as) {
    return as({ onClick: clickAction })
  }

  return (
    <Button
      onClick={clickAction}
      sx={isSmall ? styles.smallButton : styles.button}
    >
      {skip === 'year' ? '\u276E' : '\u2190'}
    </Button>
  )
}
