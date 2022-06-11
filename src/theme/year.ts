import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const CalendarYear: ComponentMultiStyleConfig = {
  parts: ['name'],

  baseStyle: {
    name: {
      h: 8,
      fontSize: 'md',
      lineHeight: 6,
      textAlign: 'center',
      textTransform: 'capitalize',
    },
  },

  defaultProps: {
    name: {
      as: 'h2',
    },
  },
}
