import * as React from 'react'
import {
  Box,
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { addMonths, format, isAfter, isBefore, isValid } from 'date-fns'
import {
  Calendar,
  CalendarControls,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarDays,
  CalendarWeek,
  CalendarDate,
  CalendarValues,
} from './index'
import { render, screen, fireEvent } from 'renderer'

function CalendarBasic() {
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
              placeholder="Select a date"
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

function CalendarRange() {
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
              placeholder="Start date"
              value={values.start}
              onChange={handleInputChange}
              ref={startInputRef}
            />
            <Input
              variant="unstyled"
              name="end"
              placeholder="End date"
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

const TODAY = new Date()
const CURRENT_MONTH_NUMBER = format(TODAY, 'MM')
const CURRENT_YEAR = format(TODAY, 'yyyy')
const CURRENT_CALENDAR_NAME = format(TODAY, 'MMMM, yyyy')

const NEXT_MONTH = addMonths(TODAY, 1)
const NEXT_MONTH_NUMBER = format(NEXT_MONTH, 'MM')
const NEXT_CALENDAR_NAME = format(NEXT_MONTH, 'MMMM, yyyy')

test('should select a date', () => {
  render(<CalendarBasic />)

  const INPUT = screen.getByPlaceholderText(/select a date/i)
  fireEvent.click(INPUT)

  const CALENDAR_HEADER = screen.getByRole('heading')
  expect(CALENDAR_HEADER).toHaveTextContent(CURRENT_CALENDAR_NAME)

  fireEvent.click(
    screen.getByRole('button', { name: `${CURRENT_MONTH_NUMBER}-5` })
  )
  expect(INPUT).toHaveValue(`${CURRENT_MONTH_NUMBER}/05/${CURRENT_YEAR}`)

  expect(CALENDAR_HEADER).not.toBeInTheDocument()
})

test('should change date in input', () => {
  render(<CalendarBasic />)

  const INPUT = screen.getByPlaceholderText(/select a date/i)
  fireEvent.click(INPUT)

  const CALENDAR_HEADER = screen.getByRole('heading')
  expect(CALENDAR_HEADER).toHaveTextContent(CURRENT_CALENDAR_NAME)

  fireEvent.change(INPUT, { target: { value: '01/10/2022' } })

  fireEvent.click(INPUT)

  expect(INPUT).toHaveValue('01/10/2022')
  expect(screen.getByRole('button', { current: 'date' })).toHaveTextContent(
    '10'
  )

  fireEvent.change(INPUT, { target: { value: '01/05/2022' } })

  expect(CALENDAR_HEADER).not.toBeInTheDocument()
})

test('should select a range date interval', () => {
  render(<CalendarRange />)

  const START_INPUT = screen.getByPlaceholderText(/start date/i)
  const END_INPUT = screen.getByPlaceholderText(/end date/i)

  fireEvent.click(START_INPUT)

  const [HEADING_FIRST, HEADING_SECOND] = screen.getAllByRole('heading')

  expect(HEADING_FIRST).toHaveTextContent(CURRENT_CALENDAR_NAME)
  expect(HEADING_SECOND).toHaveTextContent(NEXT_CALENDAR_NAME)

  fireEvent.click(
    screen.getByRole('button', { name: `${CURRENT_MONTH_NUMBER}-5` })
  )

  fireEvent.click(
    screen.getByRole('button', { name: `${NEXT_MONTH_NUMBER}-5` })
  )

  expect(START_INPUT).toHaveValue(`${CURRENT_MONTH_NUMBER}/05/${CURRENT_YEAR}`)
  expect(END_INPUT).toHaveValue(`${NEXT_MONTH_NUMBER}/05/${CURRENT_YEAR}`)

  expect(HEADING_FIRST).not.toBeInTheDocument()
  expect(HEADING_SECOND).not.toBeInTheDocument()
})

test('should change a range date interval in input', () => {
  render(<CalendarRange />)

  const START_INPUT = screen.getByPlaceholderText(/start date/i)
  const END_INPUT = screen.getByPlaceholderText(/end date/i)

  fireEvent.click(START_INPUT)

  const [HEADING_FIRST, HEADING_SECOND] = screen.getAllByRole('heading')

  expect(HEADING_FIRST).toHaveTextContent(CURRENT_CALENDAR_NAME)
  expect(HEADING_SECOND).toHaveTextContent(NEXT_CALENDAR_NAME)

  fireEvent.change(START_INPUT, { target: { value: '01/10/2022' } })

  expect(END_INPUT).toHaveFocus()

  fireEvent.change(END_INPUT, { target: { value: '02/05/2022' } })

  /** reopen calendar */
  fireEvent.click(START_INPUT)

  const [FIRST_SELECTED, SECOND_SELECTED] = screen.getAllByRole('button', {
    current: 'date',
  })

  expect(FIRST_SELECTED).toHaveTextContent('10')
  expect(SECOND_SELECTED).toHaveTextContent('5')

  fireEvent.change(START_INPUT, { target: { value: '01/09/2022' } })

  expect(HEADING_FIRST).not.toBeInTheDocument()
  expect(HEADING_SECOND).not.toBeInTheDocument()
})

test('should change a range date interval end before start and start after end', () => {
  render(<CalendarRange />)

  const START_INPUT = screen.getByPlaceholderText(/start date/i)
  const END_INPUT = screen.getByPlaceholderText(/end date/i)

  fireEvent.click(START_INPUT)

  const [HEADING_FIRST, HEADING_SECOND] = screen.getAllByRole('heading')

  expect(HEADING_FIRST).toHaveTextContent(CURRENT_CALENDAR_NAME)
  expect(HEADING_SECOND).toHaveTextContent(NEXT_CALENDAR_NAME)

  fireEvent.change(START_INPUT, { target: { value: '01/10/2022' } })

  expect(END_INPUT).toHaveFocus()

  fireEvent.change(END_INPUT, { target: { value: '02/05/2022' } })

  /** reopen calendar */
  fireEvent.click(END_INPUT)

  expect(END_INPUT).toHaveFocus()

  const FIRST_HEADING = screen.getByRole('heading', { name: 'January, 2022' })
  const LAST_HEADING = screen.getByRole('heading', { name: 'February, 2022' })

  fireEvent.change(END_INPUT, { target: { value: '01/05/2022' } })
  expect(START_INPUT).toHaveValue('')
  expect(START_INPUT).toHaveFocus()
  expect(FIRST_HEADING).toBeInTheDocument()

  fireEvent.change(START_INPUT, { target: { value: '01/07/2022' } })
  expect(END_INPUT).toHaveValue('')
  expect(END_INPUT).toHaveFocus()
  expect(LAST_HEADING).toBeInTheDocument()

  fireEvent.change(END_INPUT, { target: { value: '01/10/2022' } })
  expect(FIRST_HEADING).not.toBeInTheDocument()
  expect(LAST_HEADING).not.toBeInTheDocument()
})
