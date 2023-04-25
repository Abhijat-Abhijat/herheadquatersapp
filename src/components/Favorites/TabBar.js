import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { primaryColor } from '../../assets/jss/styles';
import Animated from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    borderColor: primaryColor.main,
    borderWidth: 1,
    backgroundColor: '#fff',
    width: 118,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftItem: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightItem: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  backgroundActive: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: primaryColor.main,
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
  label: {
    position: 'absolute',
    lineHeight: 18,
    fontSize: 13,
    letterSpacing: 0,
    zIndex: 15,
    color: '#fff',
  },
  inActiveLabel: {
    color: primaryColor.main,
  },
});

export default class TabBar extends React.PureComponent {
  _renderItem =
    ({ navigationState, position }) =>
    ({ route, index }) => {
      const inputRange = navigationState.routes.map((x, i) => i);

      const activeOpacity = Animated.interpolateNode(position, {
        inputRange,
        outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
      });

      const inactiveOpacity = Animated.interpolateNode(position, {
        inputRange,
        outputRange: inputRange.map((i) => (i === index ? 0 : 1)),
      });

      return (
        <View
          style={[
            styles.item,
            index === 0 ? styles.leftItem : styles.rightItem,
          ]}
        >
          <Animated.View
            style={[styles.backgroundActive, { opacity: activeOpacity }]}
          />
          <Animated.Text style={[styles.label]}>{route.title}</Animated.Text>
          <Animated.Text
            style={[
              styles.label,
              styles.inActiveLabel,
              { opacity: inactiveOpacity },
            ]}
          >
            {route.title}
          </Animated.Text>
        </View>
      );
    };

  render() {
    return (
      <View style={styles.container}>
        {this.props.navigationState.routes.map((route, index) => {
          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={() => this.props.jumpTo(route.key)}
            >
              {this._renderItem(this.props)({ route, index })}
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
}
