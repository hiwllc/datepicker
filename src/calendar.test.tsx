import { render, screen, userEvent } from 'renderer'
import {
  useCalendar,
  Calendar,
  CalendarContent,
  CalendarHeader,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarMonthDays,
} from '.'

function Basic() {
  const { getCalendarProps, getMonthProps } = useCalendar({
    initialDate: new Date(2022, 4),
  })

  return (
    <Calendar {...getCalendarProps()}>
      <CalendarContent>
        <CalendarHeader>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarHeader>

        <CalendarMonth {...getMonthProps()}>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarMonthDays />
        </CalendarMonth>
      </CalendarContent>
    </Calendar>
  )
}

test('should select a date', async () => {
  render(<Basic />)
  expect(screen.getByText('May, 2022')).toBeInTheDocument()

  await userEvent.click(screen.getByLabelText(/next month/))

  expect(screen.getByText('June, 2022')).toBeInTheDocument()
})
