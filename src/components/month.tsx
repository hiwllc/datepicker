import * as React from 'react'
import { Box, useMultiStyleConfig } from '@chakra-ui/react'

type MonthContext = {
  month?: number
  number: number
  name: string
  days: Date[]
}

export const MonthContext = React.createContext<MonthContext>({
  month: 0,
  number: 0,
  name: '',
  days: [],
})

export function CalendarMonth({
  children,
  ...props
}: React.PropsWithChildren<MonthContext>) {
  const styles = useMultiStyleConfig('CalendarMonth', {})

  return (
    <MonthContext.Provider value={props}>
      <Box sx={styles.month}>{children}</Box>
    </MonthContext.Provider>
  )
}
