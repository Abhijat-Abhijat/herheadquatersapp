import React from 'react';
import { Alert, Text, SafeAreaView } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Alert.alert('Something went wrong. Try reload application.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView>
          <Text>Something went wrong. Try reload application.</Text>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
