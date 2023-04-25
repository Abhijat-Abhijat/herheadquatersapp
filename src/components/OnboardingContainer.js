import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// styles
import { coolGrey, primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  skipButtonContainer: {
    marginTop: 7,
    marginBottom: 17,
    minHeight: 23,
    width: '100%',
    paddingRight: 18,
  },
  skipButtonText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    color: primaryColor.main,
    textAlign: 'right',
  },
  image: {
    width: '100%',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'lato-bold',
    fontSize: 23,
    lineHeight: 30,
    letterSpacing: 0,
    marginBottom: 22,
    marginTop: 9,
    textAlign: 'center',
  },
  simpleText: {
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 16,
    paddingHorizontal: 35,
    textAlign: 'center',
  },
  button: {
    backgroundColor: primaryColor.main,
    height: 44,
    width: 142,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    color: '#fff',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: coolGrey,
    width: 8,
    height: 8,
    borderRadius: 50,
    marginRight: 10,
  },
  activeDot: {
    backgroundColor: primaryColor.main,
  },
  bottomPadding: Platform.select({
    ios: {},
    android: {
      marginBottom: 19,
    },
  }),
});

class OnboardingContainer extends React.PureComponent {
  static propTypes = {
    image: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    next: PropTypes.func,
    step: PropTypes.number,
    maxStep: PropTypes.number,
  };

  static defaultProps = {
    step: 0,
    maxStep: 4,
  };

  renderDots = () => {
    const { step, maxStep } = this.props;

    const dots = [];

    for (let i = 0; i < maxStep; i++) {
      dots.push(
        <View key={i} style={[styles.dot, step === i && styles.activeDot]} />,
      );
    }

    return dots;
  };

  toHome = async () => {
    this.props.navigation.reset({
      routes: [
        {
          name: 'Home',
          state: {
            routes: [
              {
                name: 'Newsfeed',
                state: {
                  routes: [
                    {
                      name: 'CollaborationsList',
                    },
                    {
                      name: 'CollaborationCreate',
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    });
    await AsyncStorage.setItem('onboarding', 'true');
  };

  render() {
    const { image, title, text, next } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.skipButtonContainer}>
            {next && (
              <TouchableOpacity onPress={this.toHome}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
            )}
          </View>
          <Image source={image} style={styles.image} resizeMode={'contain'} />
          <View style={[styles.body, styles.bottomPadding]}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.simpleText}>{text}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={next ? next : this.toHome}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {next ? 'Next' : 'Collaborate'}
                </Text>
              </TouchableOpacity>
              <View style={styles.dotContainer}>{this.renderDots()}</View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default OnboardingContainer;
