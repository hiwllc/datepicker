import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const CalendarYear: ComponentMultiStyleConfig = {
  parts: ['year'],

  baseStyle: {
    year: {
      h: 8,
      fontSize: 'md',
      lineHeight: 6,
      textAlign: 'center',
      textTransform: 'capitalize',
    },
  },

  defaultProps: {
    year: {
      as: 'h2',
    },
  },
}
