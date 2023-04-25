import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, StyleSheet, Animated } from 'react-native';
// styles
import { primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

class AnimatedView extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    isFetching: PropTypes.bool,
  };

  duration = 400;

  state = {
    height: new Animated.Value(0),
  };

  componentDidUpdate() {
    if (this.props.style.height) {
      Animated.timing(this.state.height, {
        toValue: this.props.style.height,
        duration: this.duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(this.state.height, {
        toValue: 0,
        duration: this.duration,
        useNativeDriver: false,
      }).start();
    }
  }

  render() {
    let { height } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          height,
        }}
      >
        {this.props.children || null}
      </Animated.View>
    );
  }
}

export default class Spinner extends React.PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    color: PropTypes.string,
    onCenter: PropTypes.bool,
    size: PropTypes.any,
    containerStyle: PropTypes.object,
  };

  static defaultProps = {
    onCenter: false,
    size: 'large',
    color: primaryColor.main,
  };

  render() {
    if (this.props.isFetching) {
      if (this.props.onCenter) {
        return (
          <View style={styles.container}>
            <ActivityIndicator
              color={this.props.color}
              size={this.props.size}
            />
          </View>
        );
      } else if (this.props.containerStyle) {
        return (
          <AnimatedView
            isFetching={this.props.isFetching}
            style={this.props.containerStyle}
          >
            <ActivityIndicator
              color={this.props.color}
              size={this.props.size}
            />
          </AnimatedView>
        );
      } else {
        return (
          <ActivityIndicator color={this.props.color} size={this.props.size} />
        );
      }
    } else {
      return this.props.children || <AnimatedView style={{ height: 0 }} />;
    }
  }
}
