# Datepicker

A simple datepicker component build with date-fns and Chakra-UI.

# Requisites

You need to install date-fns and chakra-ui in order to use this library.

```bash
yarn add date-fns
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

After install these dependencies you can now use Datepicker

```tsx
import { useDatepicker, Calendar } from 'datepicker'

export function App() {
  useDatepicker(new Date())

  return (
    <Calendar />
  )
}
```
