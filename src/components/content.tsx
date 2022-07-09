import * as React from 'react'
import { Grid, useStyleConfig } from '@chakra-ui/react'

export function CalendarContent({
  children,
}: React.PropsWithChildren<unknown>) {
  const styles = useStyleConfig('CalendarContent')
  return <Grid sx={styles}>{children}</Grid>
}
