import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ChangeEvent, useRef, useState, useEffect } from 'react'
import { addDays, format, isValid, subDays } from 'date-fns'
import {
  Box,
  Button,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'

import { Calendar } from './calendar'
import { CalendarMonth } from './month'
import { CalendarDays } from './month-days'
import { CalendarMonthName } from './month-name'
import { CalendarWeek } from './month-week'
import { CalendarMonths } from './months'
import { CalendarControls } from './control'
import { CalendarNextButton } from './control-next-button'
import { CalendarPrevButton } from './control-prev-button'
import { CalendarDate, CalendarValues } from './types'

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

export const Basic: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

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

export const DisablePastDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

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

export const DisableFutureDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

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

export const DisableDates: ComponentStory<typeof Calendar> = () => {
  const [dates, setDates] = useState<CalendarValues>({})

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
  const [dates, setDates] = useState<CalendarValues>({})

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
  const [dates, setDates] = useState<CalendarValues>({})

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
  const [date, setDate] = useState<CalendarDate>()

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
  const [date, setDate] = useState<CalendarDate>()

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
  const [dates, setDates] = useState<CalendarValues>({})

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
  const [date, setDate] = useState<CalendarDate>()
  const [value, setValue] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const calendarRef = useRef(null)

  const handleSelectDate = (date: CalendarDate) => {
    setDate(date)
    setValue(() => (isValid(date) ? format(date, 'MM/dd/yyyy') : ''))
    onClose()
  }

  const match = (value: string) => value.match(/(\d{2})\/(\d{2})\/(\d{4})/)

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
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

  useEffect(() => {
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
