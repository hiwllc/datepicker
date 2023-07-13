import * as React from 'react'
import { Box, useMultiStyleConfig } from '@chakra-ui/react'
import { CalendarMonthStyles } from './types'

export type CalendarMonth = React.PropsWithChildren<{ month?: number }>

type MonthContext = {
  month?: number
}

export const MonthContext = React.createContext<MonthContext>({
  month: 0,
})

export function CalendarMonth({ children, month = 0 }: CalendarMonth) {
  const styles = useMultiStyleConfig('CalendarMonth', {}) as CalendarMonthStyles

  return (
    <MonthContext.Provider value={{ month }}>
      <Box sx={styles.month}>{children}</Box>
    </MonthContext.Provider>
  )
}
