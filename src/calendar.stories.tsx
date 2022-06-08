import {
  Box,
  Button,
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { addDays, format, isAfter, isBefore, isValid, subDays } from 'date-fns'
import * as locales from 'date-fns/locale'
import * as React from 'react'
import { Calendar } from './calendar'
import { CalendarControls } from './control'
import { CalendarNextButton } from './control-next-button'
import { CalendarPrevButton } from './control-prev-button'
import { CalendarMonth } from './month'
import { CalendarDays } from './month-days'
import { CalendarMonthName } from './month-name'
import { CalendarWeek } from './month-week'
import { CalendarMonths } from './months'
import { CalendarDate, CalendarValues } from './types'
import { CalendarYear } from './year'

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

export const Basic: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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
  )
}

export const CustomLocale: ComponentStory<typeof Calendar> = ({ locale }) => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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

export const DisablePastDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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
  )
}

export const DisablePastDatesFrom: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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
  )
}

export const DisableFutureDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar value={dates} onSelectDate={handleSelectDate} disableFutureDates>
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
  )
}

export const DisableFutureDatesFrom: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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
  )
}

export const DisableDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  const today = new Date()
  const disabledDates = [
    subDays(today, 5),
    today,
    addDays(today, 1),
    addDays(today, 2),
    addDays(today, 40),
  ]

  return (
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
  )
}

export const DisableWeekends: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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
  )
}

export const AllowOutsideDays: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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
  )
}

export const SingleDateSelection: ComponentStory<typeof Calendar> = () => {
  const [date, setDate] = React.useState<CalendarDate>()

  const handleSelectDate = (date: CalendarDate) => setDate(date)

  return (
    <Calendar
      value={{ start: date }}
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
  )
}

export const CustomControlButtons: ComponentStory<typeof Calendar> = () => {
  const [date, setDate] = React.useState<CalendarDate>()

  const handleSelectDate = (date: CalendarDate) => setDate(date)

  return (
    <Calendar
      value={{ start: date }}
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
  )
}

export const WithMultipleMonths: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const MONTHS = 2
  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar value={dates} onSelectDate={handleSelectDate} months={MONTHS}>
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths>
        {[...Array(MONTHS).keys()].map(month => (
          <CalendarMonth month={month} key={month}>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        ))}
      </CalendarMonths>
    </Calendar>
  )
}

export const WithInputPopover: ComponentStory<typeof Calendar> = () => {
  const [date, setDate] = React.useState<CalendarDate>()
  const [value, setValue] = React.useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const calendarRef = React.useRef(null)

  const handleSelectDate = (date: CalendarDate) => {
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
            value={{ start: date }}
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
  )
}

export const WithInputPopoverStartEndDates: ComponentStory<typeof Calendar> =
  () => {
    const [dates, setDates] = React.useState<CalendarValues>({})
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

    const handleSelectDate = (dates: CalendarValues) => {
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

      if (
        target.name === 'start' &&
        match(target.value) &&
        endInputRef.current
      ) {
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
                  {[...Array(MONTHS).keys()].map(m => (
                    <CalendarMonth key={m} month={m}>
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
    )
  }

export const CustomContent: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

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
  )
}

export const StartWeekDay: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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
  )
}

export const HighlightToday: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})
  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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
  )
}

export const WeekSelection: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
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
  )
}
export const ChangeYear: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = React.useState<CalendarValues>({})

  const handleSelectDate = (dates: CalendarValues) => setDates(dates)

  return (
    <Calendar value={dates} onSelectDate={handleSelectDate}> 
      <Box>
        <Flex p={4} pb={0} justifyContent="space-between">
          <CalendarPrevButton year />
          <CalendarYear />
            <CalendarNextButton year />
         </Flex>
         <Box>
          <CalendarControls>
            <CalendarPrevButton />
            <CalendarNextButton />  
          </CalendarControls>
          <CalendarMonths>
            <CalendarMonth>
              <CalendarMonthName format="MMMM" />
              <CalendarWeek />
              <CalendarDays />
            </CalendarMonth>
          </CalendarMonths>
        </Box>
      </Box>
    </Calendar>
  )
}
