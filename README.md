# Datepicker

A simple datepicker component build with date-fns and Chakra-UI.

## Table of Contents

- [Requisites](#requisites)
- [Installation and Usage](#installation-and-usage)
- [Customizing](#customizing)
- [License](#license)

## Requisites

You need to install [date-fns][1] and [chakra-ui][2] in order to use this library.

```bash
yarn add date-fns
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

## Installation and Usage

After install these dependencies you can now install the library and use this as below:

```bash
yarn add @uselessdev/datepicker
```

Before to use this you can create your own theme or use the default one.

```tsx
import { ChakraProvider } from '@chakra-ui/react'
import { Calendar, CalendarDefaultTheme } from 'datepicker'

export function App() {
  const [dates, setDates] = useState()

  const handleSelectEndDate = (date) => setDates(dates => ({ ...dates, end: date }))
  const handleSelectStartDate = (date) => setDates(dates => ({ ...dates, start: date }))

  return (
    return (
      <ChakraProvider theme={CalendarDefaultTheme}>
        <Calendar
          values={dates}
          onSelectEndDate={handleSelectEndDate}
          onSelectStartDate={handleSelectStartDate}
        />
      </ChakraProvider>
    )
  )
}
```

**note that the example above doens't render an input but only the calendar**

### Customizing

`TODO`

## License

This code is under the [Apache-2.0](LICENSE) License

[1]: https://date-fns.org/
[2]: https://chakra-ui.com/
