import { ComponentSingleStyleConfig } from '@chakra-ui/react'

export const CalendarDay: ComponentSingleStyleConfig = {
  baseStyle: {
    rounded: 'none',
    bgColor: 'transparent',

    _hover: {
      bgColor: 'gray.100',
    },

    _disabled: {
      color: 'gray.200',
      _hover: {
        cursor: 'initial',
        bgColor: 'transparent',
      },
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

      _disabled: {
        _hover: {
          bgColor: 'pink.300',
        },
      },
    },

    outside: {
      color: 'gray.300',
    },
    today: {
      bgColor: 'pink.100',
      _hover: {
        bgColor: 'pink.200',
      },
    },
  },

  defaultProps: {
    size: 'sm',
  },
}
