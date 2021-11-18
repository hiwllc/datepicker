export type CalendarDate = Date | number

export type CalendarValues = {
  start?: CalendarDate
  end?: CalendarDate
}

export type Buttons = ({ onClick }: { onClick: () => void }) => JSX.Element
