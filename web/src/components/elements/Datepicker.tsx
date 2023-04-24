import { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

const Date = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null
  })

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }

  return (
    <Datepicker
      displayFormat={'DD/MM/YYYY'}
      useRange={false}
      asSingle={true}
      value={value}
      onChange={handleValueChange}
    />
  )
}

export default Date
