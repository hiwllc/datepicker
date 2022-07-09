import { ComponentStyleConfig } from '@chakra-ui/react'

export const CalendarDay: ComponentStyleConfig = {
  baseStyle: {
    rounded: 'none',
    bgColor: 'transparent',
    textAlign: 'center',

    _hover: {
      bgColor: 'gray.100',
    },
  },

  sizes: {
    sm: {
      h: 8,
    },
  },

  variants: {
    normal: {
      w: 8,
    },
  },

  defaultProps: {
    size: 'sm',
    variant: 'normal',
  },
}
