import React, { useCallback } from 'react';
// components
import GenericCheckboxField from 'src/modules/core/containers/fields/GenericCheckboxField';

function MultipleCheckboxField({ input, meta, ...rest }) {
  const optionHandler = useCallback(
    (option) => {
      const valueIndex = input.value.indexOf(option.value);
      const active = valueIndex !== -1;

      const onPress = () => {
        const arrCopy = [...input.value];

        if (active) {
          arrCopy.splice(valueIndex, 1);
        } else {
          arrCopy.push(option.value);
        }

        input.onChange(arrCopy);
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

export default MultipleCheckboxField;
