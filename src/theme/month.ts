import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const CalendarMonth: ComponentMultiStyleConfig = {
  parts: ['months', 'month', 'name', 'week', 'weekday', 'days'],

  baseStyle: {
    months: {
      w: 'full',
    },

    name: {
      h: 8,
      fontSize: 'md',
      textAlign: 'center',
      textTransform: 'capitalize',
    },

    week: {
      gridTemplateColumns: 'repeat(7, 1fr)',
    },

    weekday: {
      color: 'gray.500',
      textAlign: 'center',
      textTransform: 'capitalize',
    },

    days: {
      gridTemplateColumns: 'repeat(7, 1fr)',
    },
  },
}
