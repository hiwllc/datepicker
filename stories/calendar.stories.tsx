import * as React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import {
  Calendar,
  CalendarContent,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthDays,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeek,
  useCalendar,
} from '../src'
import { addMonths } from 'date-fns'

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

export const Basic: ComponentStory<typeof Calendar> = () => {
  const { getCalendarProps } = useCalendar({
    initialDate: addMonths(new Date(), 1),
  })

  return (
    <Calendar {...getCalendarProps()}>
      <CalendarContent>
        <CalendarHeader>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarHeader>

        <CalendarMonth>
          <CalendarMonthName />
          <CalendarWeek />
          <CalendarMonthDays />
        </CalendarMonth>
      </CalendarContent>
    </Calendar>
  )
}

export const WithMultipleMonths: ComponentStory<typeof Calendar> = () => {
  const { getCalendarProps } = useCalendar({
    initialDate: addMonths(new Date(), 1),
    months: 2,
  })

  return (
    <Calendar {...getCalendarProps()}>
      <CalendarContent>
        <CalendarHeader>
          <CalendarPrevButton />
          <CalendarNextButton />
        </CalendarHeader>

        <CalendarMonths>
          {({ months }) => (
            <>
              {months.map(month => (
                <CalendarMonth key={month.name} month={month.number}>
                  <CalendarMonthName />
                  <CalendarWeek />
                  <CalendarMonthDays />
                </CalendarMonth>
              ))}
            </>
          )}
        </CalendarMonths>
      </CalendarContent>
    </Calendar>
  )
}
