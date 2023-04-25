import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
// components
import TextField from 'src/components/Fields/TextField';
// styles
import { blackColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  inputWithStartAdornment: {
    flexDirection: 'row',
  },
  startAdornmentContainer: {
    borderBottomColor: 'rgb(151, 151, 151)',
    borderBottomWidth: 1,
  },
  startAdornmentText: {
    ...Platform.select({
      android: {
        paddingBottom: 10,
      },
      ios: {
        paddingBottom: 12,
      },
    }),
    color: blackColor,
    letterSpacing: 0,
    lineHeight: 18,
    fontFamily: 'lato-regular',
    fontSize: 13,
  },
  label: {
    fontFamily: 'lato-bold',
    color: blackColor,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    ...Platform.select({
      android: {
        marginBottom: 12,
      },
      ios: {
        marginBottom: 9,
      },
    }),
  },
});

function PrependTextField(props) {
  const { prependText, label, containerStyle, input, inputProps, ...rest } =
    props;

  const [animatedValue] = useState(
    () => new Animated.Value(input.value ? 1 : 0),
  );
  const inputRef = useRef();

  const onBlurInput = () => {
    if (!input.value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const onFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={() => onFocusInput()}>
      <View style={[styles.inputWithStartAdornment, containerStyle]}>
        <View style={styles.startAdornmentContainer}>
          <Text style={styles.label}>{label}</Text>
          <Animated.Text
            style={[
              styles.startAdornmentText,
              {
                opacity: animatedValue,
              },
            ]}
          >
            {prependText}
          </Animated.Text>
        </View>
        <TextField
          {...rest}
          input={{
            ...input,
            onBlur: onBlurInput,
            onFocus: onFocusInput,
          }}
          inputProps={{
            ...inputProps,
            ref: inputRef,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default PrependTextField;
