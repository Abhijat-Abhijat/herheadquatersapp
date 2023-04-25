import React from 'react';
// components
import BooleanButtonSwitch from 'src/modules/core/components/BooleanButtonSwitch';

function BooleanButtonSwitchField({ input, meta, ...rest }) {
  return (
    <BooleanButtonSwitch
      value={input.value}
      handleChange={input.onChange}
      error={meta.touched && meta.error}
      {...rest}
    />
  );
}

export default BooleanButtonSwitchField;
