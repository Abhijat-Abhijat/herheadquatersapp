import React, { useCallback } from 'react';
// components
import GenericCheckboxField from 'src/modules/core/containers/fields/GenericCheckboxField';

function RadioCheckboxField({ input, meta, ...rest }) {
  const optionHandler = useCallback(
    (option) => {
      const active = input.value === option.value;

      const onPress = () => {
        input.onChange(option.value);
      };

      const text = option.label;

      return {
        text,
        onPress,
        active,
      };
    },
    [input.value, input.onChange],
  );

  const error = meta.touched && meta.error;

  return (
    <GenericCheckboxField
      {...rest}
      optionHandler={optionHandler}
      error={error}
    />
  );
}

export default RadioCheckboxField;
