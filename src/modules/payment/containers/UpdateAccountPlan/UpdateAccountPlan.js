import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Image, Platform, Alert, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// components
import Button from 'src/components/Buttons/Button';
import TabButton from 'src/modules/core/components/TabButton';
import HerHeadquartersIcon from 'src/components/Icons/HerHeadquartersIcon';
import Spinner from 'src/components/Spinner';
import TermsAndPrivacyLinks from 'src/modules/core/components/TermsAndPrivacyLinks';
// actions
import {
  getIAPSubscriptionsListRequest,
  handlePurchaseRequest,
  downgradeOldPremiumToBasicRequest,
} from 'src/modules/payment/payment.actions';
// selectors
import { selectUserAccountPlan } from 'src/modules/user/selectors';
import {
  selectIsReadyToPurchaseSubscription,
  selectIsStorePaymentProceeding,
  selectIsBackendPaymentProceeding,
  selectIsConnectedToStore,
} from 'src/modules/payment/payment.selectors';
// account plan types
import {
  premiumPlus,
  premium,
  basic,
  oldPremium,
  allPlanList,
} from 'src/modules/payment/planTypes';
// services
import ToastService from 'src/services/ToastService';
// helpers
import { createUpdateAccountButtonText } from 'src/modules/payment/payment.helpers';
// styles
import styles from './UpdateAccountPlan.styled';

function UpdateAccountPlan({ isFirstTime, callback }) {
  const dispatch = useDispatch();

  const userAccountPlan = useSelector(selectUserAccountPlan);
  const isReadyToPurchase = useSelector(selectIsReadyToPurchaseSubscription);
  const isStorePaymentProceeding = useSelector(selectIsStorePaymentProceeding);
  const isPaymentProceeding = useSelector(selectIsBackendPaymentProceeding);
  const isConnectedToStore = useSelector(selectIsConnectedToStore);

  const [selectedPlan, setSelectedPlan] = useState(premium);

  const isPurchasing = isPaymentProceeding || isStorePaymentProceeding;

  const userAccountTitle = useMemo(
    () => allPlanList.find((acc) => acc.name === userAccountPlan)?.title,
    [userAccountPlan],
  );

  const purchase = () => {
    if (isPurchasing) {
      return;
    }

    // if user selected the plan that he has
    if (userAccountPlan === selectedPlan.name) {
      callback();
      ToastService.showToast('Your membership stays the same!', 'info');
      return;
    }

    // if user has old_premium (stripe) and selects basic
    if (
      userAccountPlan === oldPremium.name &&
      selectedPlan.name === basic.name
    ) {
      const downgradeCallback = () => {
        callback();
        ToastService.showToast(
          'Your membership was successfully updated.',
          'info',
        );
      };

      dispatch(downgradeOldPremiumToBasicRequest(downgradeCallback));
      return;
    }

    // if user has premium or premium_plus plan and selects basic
    if (
      (userAccountPlan === premium.name ||
        userAccountPlan === premiumPlus.name) &&
      selectedPlan.name === basic.name
    ) {
      const manageSubscriptionLink = Platform.select({
        ios: 'https://apps.apple.com/account/subscriptions',
        android: 'https://play.google.com/store/account/subscriptions',
      });

      Alert.alert(
        'Downgrade to Basic!',
        'To downgrade to basic you need to unsubscribe from HH in App Store!',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Handle Subscriptions!',
            onPress: () => {
              Linking.openURL(manageSubscriptionLink);
            },
          },
        ],
      );
      return;
    }

    const paymentCallback = () => {
      callback();
      ToastService.showToast(
        'Your membership was successfully updated.',
        'info',
      );
    };

    dispatch(handlePurchaseRequest(selectedPlan.storeId, paymentCallback));
  };

  useEffect(() => {
    if (isConnectedToStore) {
      dispatch(getIAPSubscriptionsListRequest());
    }
  }, [isConnectedToStore]);

  return (
    <View style={styles.container}>
      <View style={styles.currentAccountContainer}>
        <Text style={styles.currentAccountText}>
          Current Membership: {userAccountTitle}
        </Text>
      </View>
      <View style={styles.tabsWrapper}>
        <View style={styles.firstTabContainer}>
          <TabButton
            text={premiumPlus.title}
            selected={selectedPlan.title === premiumPlus.title}
            onPress={() => {
              setSelectedPlan(premiumPlus);
            }}
          />
        </View>
        <View style={styles.tabContainer}>
          <View>
            <Text style={styles.headerTabText}>Most Popular</Text>
          </View>
          <TabButton
            text={premium.title}
            selected={selectedPlan.title === premium.title}
            onPress={() => {
              setSelectedPlan(premium);
            }}
          />
        </View>
        <View style={styles.lastTabContainer}>
          <TabButton
            text={basic.title}
            selected={selectedPlan.title === basic.title}
            onPress={() => {
              setSelectedPlan(basic);
            }}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={selectedPlan.image} />
        <Text style={styles.planAlias}>{selectedPlan.alias}</Text>
      </View>
      <View style={styles.advantagesContainer}>
        {selectedPlan.advantages.map((adv, i) => {
          return (
            <View style={styles.advantageContainer} key={`${adv.title}_${i}`}>
              <View style={styles.advantageIconContainer}>
                <HerHeadquartersIcon
                  name={
                    adv.active ? 'ios-checkmark-circle' : 'ios-close-circle'
                  }
                  size={24}
                  color={adv.active ? '#02BAC2' : '#F74646'}
                />
              </View>
              <Text style={styles.advantageText}>{adv.text}</Text>
            </View>
          );
        })}
      </View>
      <Text style={styles.priceText}>{selectedPlan.priceText}</Text>
      <View style={styles.buttonContainer}>
        <Spinner isFetching={!isReadyToPurchase} onCenter>
          <Button
            type={'orange'}
            styleButton={styles.button}
            onPress={purchase}
            disable={isPurchasing}
          >
            <Spinner isFetching={isPurchasing}>
              <Text style={styles.buttonText}>
                {isFirstTime
                  ? 'Get Started'
                  : createUpdateAccountButtonText(
                      selectedPlan,
                      userAccountPlan,
                    )}
              </Text>
            </Spinner>
          </Button>
        </Spinner>
      </View>
      <TermsAndPrivacyLinks />
    </View>
  );
}

export default UpdateAccountPlan;
