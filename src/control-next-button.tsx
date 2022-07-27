import * as React from 'react'
import { Button, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarContext } from './context'
import { CalendarControlStyles } from './types'

type CalendarNextButton = {
  as?: ({ onClick }: { onClick: VoidFunction }) => JSX.Element
  skip?: 'month' | 'year'
  isSmall?: boolean
}

export function CalendarNextButton({ as, skip, isSmall }: CalendarNextButton) {
  const styles = useMultiStyleConfig(
    'CalendarControl',
    {}
  ) as CalendarControlStyles
  const { nextMonth, nextYear } = React.useContext(CalendarContext)

  const clickAction = skip === 'year' ? nextYear : nextMonth

  if (as) {
    return as({ onClick: clickAction })
  }

  return (
    <Button
      onClick={clickAction}
      sx={isSmall ? styles.smallButton : styles.button}
    >
      {skip === 'year' ? '\u00BB' : '\u2192'}
    </Button>
  )
}
