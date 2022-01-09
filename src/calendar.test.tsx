import * as React from 'react'
import {
  Box,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { format, isValid } from 'date-fns'
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
} from './index'
import { CalendarDate } from './types'
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

const TODAY = new Date()
const CURRENT_MONTH_NUMBER = format(TODAY, 'MM')
const CURRENT_YEAR = format(TODAY, 'yyyy')
const CURRENT_CALENDAR_NAME = format(TODAY, 'MMMM, yyyy')

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

test.todo('should change date in input')
test.todo('should select a range date interval')
test.todo('should change a range date interval in input')
