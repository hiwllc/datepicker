import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import {
  Box,
  Button,
  Circle,
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react'
import * as locales from 'date-fns/locale'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import { subDays, addDays, isValid, format, isAfter, isBefore } from 'date-fns'

import {
  Calendar,
  CalendarDateRange,
  CalendarMonth,
  CalendarDays,
  CalendarMonthName,
  CalendarWeek,
  CalendarMonths,
  CalendarControls,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarAdapterProvider,
  CalendarSingleDate,
  useCalendarDay,
} from '../src'
import { AdapterDayjs } from '../src/adapters/AdapterDayjs'
import { AdapterDateFns } from '../src/adapters/AdapterDateFns'

export default {
  title: 'calendar',
  component: Calendar,
} as Meta<typeof Calendar>

export const Basic: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar value={dates} onSelectDate={handleSelectDate}>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const WithDayjsAdapter: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Dayjs>>({})

  const handleSelectDate = (dates: CalendarDateRange<Dayjs>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDayjs}>
      <Calendar value={dates} onSelectDate={handleSelectDate}>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const CustomLocale: StoryFn<typeof Calendar> = ({ locale }) => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        value={dates}
        onSelectDate={handleSelectDate}
        locale={locale}
        weekdayFormat="EEEEEE"
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

const mapping = Object.fromEntries(Object.entries(locales))

CustomLocale.argTypes = {
  locale: {
    options: Object.keys(mapping),
    mapping,
  },
}

CustomLocale.args = {
  locale: locales.ptBR,
}

export const DisablePastDates: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar value={dates} onSelectDate={handleSelectDate} disablePastDates>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const DisablePastDatesFrom: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        value={dates}
        onSelectDate={handleSelectDate}
        disablePastDates={subDays(new Date(), 2)}
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const DisableFutureDates: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        value={dates}
        onSelectDate={handleSelectDate}
        disableFutureDates
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const DisableFutureDatesFrom: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        value={dates}
        onSelectDate={handleSelectDate}
        disableFutureDates={addDays(new Date(), 2)}
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const DisableDates: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  const today = new Date()
  const disabledDates = [
    subDays(today, 5),
    today,
    addDays(today, 1),
    addDays(today, 2),
    addDays(today, 40),
  ]

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        value={dates}
        onSelectDate={handleSelectDate}
        disableDates={disabledDates}
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const DisableWeekends: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar value={dates} onSelectDate={handleSelectDate} disableWeekends>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const AllowOutsideDays: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar value={dates} onSelectDate={handleSelectDate} allowOutsideDays>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const SingleDateSelection: StoryFn<typeof Calendar> = () => {
  const [date, setDate] = React.useState<CalendarSingleDate<Date>>()

  const handleSelectDate = (date: CalendarSingleDate<Date>) => setDate(date)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        value={date}
        onSelectDate={handleSelectDate}
        singleDateSelection
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const CustomControlButtons: StoryFn<typeof Calendar> = () => {
  const [date, setDate] = React.useState<CalendarSingleDate<Date>>()

  const handleSelectDate = (date: CalendarSingleDate<Date>) => setDate(date)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        value={date}
        onSelectDate={handleSelectDate}
        singleDateSelection
      >
        <CalendarControls>
          <CalendarPrevButton
            as={props => (
              <Button size="xs" rounded="full" colorScheme="pink" {...props}>
                &#8249;
              </Button>
            )}
          />
          <CalendarNextButton
            as={props => (
              <Button size="xs" rounded="full" colorScheme="pink" {...props}>
                &#8250;
              </Button>
            )}
          />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const WithMultipleMonths: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const MONTHS = 2
  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar value={dates} onSelectDate={handleSelectDate} months={MONTHS}>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          {Array.from({ length: MONTHS }, (_, month) => (
            <CalendarMonth month={month} key={month}>
              <CalendarMonthName />
              <CalendarWeek />
              <CalendarDays />
            </CalendarMonth>
          ))}
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const WithInputPopover: StoryFn<typeof Calendar> = () => {
  const [date, setDate] = React.useState<CalendarSingleDate<Date>>()
  const [value, setValue] = React.useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const calendarRef = React.useRef(null)

  const handleSelectDate = (date: CalendarSingleDate<Date>) => {
    setDate(date)
    setValue(() => (isValid(date) ? format(date, 'MM/dd/yyyy') : ''))
    onClose()
  }

  const match = (value: string) => value.match(/(\d{2})\/(\d{2})\/(\d{4})/)

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value)

    if (match(target.value)) {
      onClose()
    }
  }

  useOutsideClick({
    ref: calendarRef,
    handler: onClose,
    enabled: isOpen,
  })

  React.useEffect(() => {
    if (match(value)) {
      const date = new Date(value)

      return setDate(date)
    }
  }, [value])

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Box minH="400px">
        <Popover
          placement="auto-start"
          isOpen={isOpen}
          onClose={onClose}
          initialFocusRef={initialRef}
          isLazy
        >
          <PopoverTrigger>
            <Box onClick={onOpen} ref={initialRef}>
              <Input
                placeholder="MM/dd/yyyy"
                value={value}
                onChange={handleInputChange}
              />
            </Box>
          </PopoverTrigger>

          <PopoverContent
            p={0}
            w="min-content"
            border="none"
            outline="none"
            _focus={{ boxShadow: 'none' }}
            ref={calendarRef}
          >
            <Calendar
              value={date}
              onSelectDate={handleSelectDate}
              singleDateSelection
            >
              <PopoverBody p={0}>
                <CalendarControls>
                  <CalendarPrevButton />
                  <CalendarNextButton />
                </CalendarControls>

                <CalendarMonths>
                  <CalendarMonth>
                    <CalendarMonthName />
                    <CalendarWeek />
                    <CalendarDays />
                  </CalendarMonth>
                </CalendarMonths>
              </PopoverBody>
            </Calendar>
          </PopoverContent>
        </Popover>
      </Box>
    </CalendarAdapterProvider>
  )
}

export const WithInputPopoverStartEndDates: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})
  const [values, setValues] = React.useState({
    start: '',
    end: '',
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const calendarRef = React.useRef(null)
  const startInputRef = React.useRef<HTMLInputElement>(null)
  const endInputRef = React.useRef<HTMLInputElement>(null)

  const MONTHS = 2

  const handleSelectDate = (dates: CalendarDateRange<Date>) => {
    setDates(dates)

    setValues({
      start: isValid(dates.start)
        ? format(dates.start as Date, 'MM/dd/yyyy')
        : '',
      end: isValid(dates.end) ? format(dates.end as Date, 'MM/dd/yyyy') : '',
    })

    if (dates.end) {
      onClose()
    }
  }

  const match = (value: string) => value.match(/(\d{2})\/(\d{2})\/(\d{4})/)

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [target.name]: target.value,
    })

    if (target.name === 'start' && match(target.value) && endInputRef.current) {
      endInputRef.current.focus()
    }
  }

  useOutsideClick({
    ref: calendarRef,
    handler: onClose,
    enabled: isOpen,
  })

  React.useEffect(() => {
    if (match(values.start)) {
      const startDate = new Date(values.start)
      const isValidStartDate = isValid(startDate)
      const isAfterEndDate = dates.end && isAfter(startDate, dates.end)

      if (isValidStartDate && isAfterEndDate) {
        setValues({ ...values, end: '' })
        return setDates({ end: undefined, start: startDate })
      }

      return setDates({ ...dates, start: startDate })
    }
  }, [values.start])

  React.useEffect(() => {
    if (match(values.end)) {
      const endDate = new Date(values.end)
      const isValidEndDate = isValid(endDate)
      const isBeforeStartDate = dates.start && isBefore(endDate, dates.start)

      if (isValidEndDate && isBeforeStartDate) {
        setValues({ ...values, start: '' })

        startInputRef.current?.focus()

        return setDates({ start: undefined, end: endDate })
      }

      onClose()
      return setDates({ ...dates, end: endDate })
    }
  }, [values.end])

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Box minH="400px">
        <Popover
          placement="auto-start"
          isOpen={isOpen}
          onClose={onClose}
          initialFocusRef={initialRef}
          isLazy
        >
          <PopoverTrigger>
            <Flex
              w="400px"
              borderWidth={1}
              rounded="md"
              p={2}
              onClick={onOpen}
              ref={initialRef}
            >
              <Input
                variant="unstyled"
                name="start"
                placeholder="MM/dd/yyyy"
                value={values.start}
                onChange={handleInputChange}
                ref={startInputRef}
              />
              <Input
                variant="unstyled"
                name="end"
                placeholder="MM/dd/yyyy"
                value={values.end}
                onChange={handleInputChange}
                ref={endInputRef}
              />
            </Flex>
          </PopoverTrigger>

          <PopoverContent
            p={0}
            w="min-content"
            border="none"
            outline="none"
            _focus={{ boxShadow: 'none' }}
            ref={calendarRef}
          >
            <Calendar
              value={dates}
              onSelectDate={handleSelectDate}
              months={MONTHS}
            >
              <PopoverBody p={0}>
                <CalendarControls>
                  <CalendarPrevButton />
                  <CalendarNextButton />
                </CalendarControls>

                <CalendarMonths>
                  {Array.from({ length: MONTHS }, (_, month) => (
                    <CalendarMonth key={month} month={month}>
                      <CalendarMonthName />
                      <CalendarWeek />
                      <CalendarDays />
                    </CalendarMonth>
                  ))}
                </CalendarMonths>
              </PopoverBody>
            </Calendar>
          </PopoverContent>
        </Popover>
      </Box>
    </CalendarAdapterProvider>
  )
}

export const CustomContent: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  const today = new Date()

  const addSevenDays = () =>
    setDates({
      start: today,
      end: addDays(today, 7),
    })

  const subSevenDays = () =>
    setDates({
      start: subDays(today, 7),
      end: today,
    })

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar value={dates} onSelectDate={handleSelectDate}>
        <Box position="relative">
          <CalendarControls>
            <CalendarPrevButton />
            <CalendarNextButton />
          </CalendarControls>

          <CalendarMonths>
            <CalendarMonth>
              <CalendarMonthName />
              <CalendarWeek />
              <CalendarDays />
            </CalendarMonth>
          </CalendarMonths>
        </Box>

        <VStack
          spacing={4}
          bgColor="gray.50"
          p={4}
          alignItems="stretch"
          borderEndRadius="md"
          flex={1}
        >
          <Button onClick={addSevenDays} colorScheme="blue" size="xs">
            7 next days
          </Button>

          <Button onClick={subSevenDays} colorScheme="red" size="xs">
            7 prev days
          </Button>
        </VStack>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const StartWeekDay: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar value={dates} onSelectDate={handleSelectDate} weekStartsOn={1}>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const HighlightToday: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})
  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar value={dates} onSelectDate={handleSelectDate} highlightToday>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const WeekSelection: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        value={dates}
        onSelectDate={handleSelectDate}
        allowOutsideDays
        weekDateSelection
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

function CustomDay() {
  const { day, onSelectDates, isSelected, isInRange } = useCalendarDay<Date>()

  const selected = isSelected
    ? {
        bgColor: 'teal.400',
        color: 'white',
        rounded: 0,
        _hover: {
          bgColor: 'teal.300',
        },
      }
    : {}

  const range = isInRange
    ? {
        bgColor: 'teal.300',
        color: 'white',
        rounded: 'none',
        _hover: {
          bgColor: 'teal.200',
        },
      }
    : {}

  return (
    <Button
      variant="ghost"
      onClick={() => onSelectDates(day)}
      sx={{ ...selected, ...range }}
    >
      {new Date(day).getDate() < 8 ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Text>{format(day, 'd')}</Text>
          <Circle size="4px" bgColor="pink.300" />
        </Box>
      ) : (
        format(day, 'd')
      )}
    </Button>
  )
}

export const WithCustomDay: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})
  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar value={dates} onSelectDate={handleSelectDate}>
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays>
              <CustomDay />
            </CalendarDays>
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}

export const AllowSelectSameDay: StoryFn<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarDateRange<Date>>({})

  const handleSelectDate = (dates: CalendarDateRange<Date>) => setDates(dates)

  return (
    <CalendarAdapterProvider adapter={AdapterDateFns}>
      <Calendar
        value={dates}
        onSelectDate={handleSelectDate}
        allowSelectSameDay
      >
        <CalendarControls>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarControls>

        <CalendarMonths>
          <CalendarMonth>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        </CalendarMonths>
      </Calendar>
    </CalendarAdapterProvider>
  )
}
