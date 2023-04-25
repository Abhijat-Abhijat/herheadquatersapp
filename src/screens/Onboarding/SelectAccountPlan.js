import React, { useCallback, useEffect } from 'react';
import { ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
// containers
import UpdateAccountPlan from 'src/modules/payment/containers/UpdateAccountPlan';
// components
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// selectors
import { selectUserAcountSubscriptionProvider } from 'src/selectors/user';

function SelectAccountPlanScreen({ navigation }) {
  const subscriptionProvider = useSelector(
    selectUserAcountSubscriptionProvider,
  );

  const onSuccessCallback = useCallback(() => {
    navigation.navigate('Onboarding1');
  }, [navigation.navigate]);

  useEffect(() => {
    if (subscriptionProvider === 'stripe') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding1' }],
      });
    }
  }, [subscriptionProvider, navigation.reset]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#C5E3E6',
        paddingLeft: 10,
        paddingRight: 10,
      }}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 0,
      }}
    >
      <StatusBar backgroundColor="#C5E3E6" barStyle="dark-content" />
      <UpdateAccountPlan isFirstTime={true} callback={onSuccessCallback} />
    </ScrollView>
  );
}

export const screenOptions = ({ navigation }) => {
  return {
    headerTitle: 'Start Your Membership',
    headerStyle: {
      backgroundColor: '#C5E3E6',
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTitleStyle: {
      color: '#333333',
    },
    headerTintColor: '#333333',
    headerLeft: () => {
      return (
        <TouchableOpacity
          style={{
            marginLeft: 12,
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 8,
            paddingBottom: 8,
          }}
          onPress={() => {
            navigation.navigate('Onboarding1');
          }}
        >
          <Icon name={'ios-close-circle'} size={28} color={'#333333'} />
        </TouchableOpacity>
      );
    },
  };
};

export default SelectAccountPlanScreen;
