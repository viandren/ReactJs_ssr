import React from 'react';
import { useField } from 'formik';
import Select from 'react-select';

const MultiSelectInput = ({ options, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  const handleChange = (selectedOptions) => {
    console.log(selectedOptions)
    helpers.setValue(selectedOptions);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#424242",
      // match with the menu
        border: "0",
        color: "#fff",
      // Overwrittes the different states of border
      // Removes weird border around container
      "&:hover": {
        // Overwrittes the different states of border
      }
    }),
    menu: base => ({
      ...base,
      background: "#424242",
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      background: "#424242",
    }),
    option: (styles, {isFocused, isSelected}) => ({
        ...styles,
        background: isFocused
            ? 'hsla(291, 64%, 42%, 0.5)'
            : isSelected
                ? 'hsla(291, 64%, 42%, 1)'
                : undefined,
        zIndex: 1
    })
  };

  return (
    <Select
      {...field}
      {...props}
      styles={customStyles}
      options={options}
      isMulti
      onChange={handleChange}
      onBlur={() => helpers.setTouched(true)}
    />
  );
};

export default MultiSelectInput;