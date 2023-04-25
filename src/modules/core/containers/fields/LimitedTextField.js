import React from 'react';
// components
import TextField from 'src/components/Fields/TextField';

function LimitedTextField(props) {
  const maxLength = props.inputProps.maxLength;
  const textLength = props.input.value.length;

  const charsLeft = maxLength - textLength;

  const helperText = `${charsLeft} character${
    charsLeft === 1 ? '' : 's'
  } remaining`;

  return <TextField {...props} helperText={helperText} />;
}

export default LimitedTextField;
