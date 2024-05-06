import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField } from 'formik';

const DatePickerField = ({ ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  const handleChange = (date) => {
    helpers.setValue(date);
  };

  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={handleChange}
      onBlur={() => helpers.setTouched(true)}

      placeholderText="Select Date"
      type="string"
      className="movie-form-input"
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={9}
    />
  );
};

export default DatePickerField;


