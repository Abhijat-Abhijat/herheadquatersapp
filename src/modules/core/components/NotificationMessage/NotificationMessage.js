import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
// styles
import styles from './NotificationMessage.styled';

function NotificationMessage(props) {
  const { style, title, message, onPress, onClose } = props;

  const { top } = useSafeAreaInsets();

  const offset = useSharedValue(-20);
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    offset.value = withSpring(0);
    opacity.value = withSpring(1);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        { top, position: 'absolute' },
        animatedStyles,
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('../../../../../assets/notificationSuccessIcon.png')}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title} onPress={onPress}>
          {title}
        </Text>
        <Text style={styles.message} onPress={onPress}>
          {message}
        </Text>
      </View>
      <View style={styles.closeIconWrapper}>
        <Text style={styles.closeIcon} onPress={onClose}>
          X
        </Text>
      </View>
    </Animated.View>
  );
}

export default NotificationMessage;
