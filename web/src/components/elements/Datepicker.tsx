import Datepicker from 'react-tailwindcss-datepicker'

const DatePicker = ({ value, setValue }) => {
  const handleValueChange = (newValue) => {
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

export default DatePicker
