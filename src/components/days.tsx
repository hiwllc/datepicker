import * as React from 'react'
import {
  Button,
  Grid,
  useStyleConfig,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { format, getDay } from 'date-fns'
import { MonthContext } from './month'

export function CalendarMonthDays() {
  const { days } = React.useContext(MonthContext)
  const style = useStyleConfig('CalendarDay')
  const styles = useMultiStyleConfig('CalendarMonth', {})

  return (
    <Grid sx={styles.days}>
      {days.map(day => {
        const weekday = getDay(day)

        return (
          <Button sx={style} gridColumn={weekday + 1} key={format(day, 'd-M')}>
            {format(day, 'd')}
          </Button>
        )
      })}
    </Grid>
  )
}
