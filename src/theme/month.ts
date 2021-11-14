import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const CalendarMonth: ComponentMultiStyleConfig = {
  parts: ['month', 'name', 'week', 'weekday', 'days'],

  baseStyle: {
    name: {
      h: 8,
      fontSize: 'md',
      lineHeight: 6,
      textAlign: 'center',
    },

    week: {
      gridTemplateColumns: 'repeat(7, 1fr)',
    },

    weekday: {
      color: 'gray.500',
      textAlign: 'center',
    },

    days: {
      gridTemplateColumns: 'repeat(7, 1fr)',
    },
  },

  defaultProps: {
    name: {
      as: 'h2',
    },
  },
}
