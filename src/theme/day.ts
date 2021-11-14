import { ComponentSingleStyleConfig } from '@chakra-ui/react'

export const CalendarDay: ComponentSingleStyleConfig = {
  baseStyle: {
    rounded: 'none',
    bgColor: 'transparent',

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
    selected: {
      bgColor: 'pink.400',
      color: 'white',

      _hover: {
        bgColor: 'pink.300',
      },
    },

    range: {
      bgColor: 'pink.200',
      color: 'white',

      _hover: {
        bgColor: 'pink.100',
      },
    },
  },

  defaultProps: {
    size: 'sm',
  },
}
