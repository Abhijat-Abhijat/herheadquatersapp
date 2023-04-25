import React, { useState, useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// components
import Spinner from 'src/components/Spinner';
import SelectComponent from 'src/components/Fields/SelectComponent';
import Button from 'src/components/Buttons/Button';
// actions
import {
  handlePurchaseRequest,
  getIAPProductsListRequest,
} from 'src/modules/payment/payment.actions';
// selectors
import {
  selectIsReadyToPurchaseProduct,
  selectIsStorePaymentProceeding,
  selectIsBackendPaymentProceeding,
  selectIsConnectedToStore,
} from 'src/modules/payment/payment.selectors';
// services
import ToastService from 'src/services/ToastService';
// types
import {
  creditSelectOptionList,
  creditList,
} from 'src/modules/payment/productTypes';
// helpers
import { getCreditBySelectValue } from 'src/modules/payment/payment.helpers';
// styles
import styles from './PurchaseCredits.styled';

function PurchaseCredits({ callback }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isReadyToPurchaseProduct = useSelector(selectIsReadyToPurchaseProduct);
  const isStorePaymentProceeding = useSelector(selectIsStorePaymentProceeding);
  const isPaymentProceeding = useSelector(selectIsBackendPaymentProceeding);
  const isConnectedToStore = useSelector(selectIsConnectedToStore);

  const [selectedCredit, setSelectedCredit] = useState(creditList[0]);

  const isPurchasing = isPaymentProceeding || isStorePaymentProceeding;

  const handleOptionChange = useCallback((value) => {
    const credit = getCreditBySelectValue(value);

    setSelectedCredit(credit);
  }, []);

  const buyCredits = () => {
    if (isPurchasing) {
      return;
    }

    const id = selectedCredit.storeId;

    const successCallback = () => {
      callback();
      ToastService.showToast('Successfully purchased credits!');
    };

    dispatch(handlePurchaseRequest(id, successCallback));
  };

  const clickMembershipText = () => {
    navigation.replace('AccountPlanEdit');
  };

  useEffect(() => {
    if (isConnectedToStore) {
      dispatch(getIAPProductsListRequest());
    }
  }, [isConnectedToStore]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Tired of buying credits?</Text>
        <Text style={styles.text}>
          {'Check out our '}
          <Text
            style={[styles.text, styles.membershipText]}
            onPress={clickMembershipText}
          >
            Premium Memberships
          </Text>
          .
        </Text>
      </View>
      <View style={styles.purchaseContainer}>
        <Spinner isFetching={!isReadyToPurchaseProduct} onCenter>
          <View style={styles.selectCreditsWrapper}>
            <Text style={styles.creditsNumberText}>Number of Credits</Text>
            <SelectComponent
              options={creditSelectOptionList}
              value={selectedCredit.selectValue}
              onChange={handleOptionChange}
              inputStyle={styles.select}
            />
            <View style={styles.selectUnderline} />
            <Text style={styles.priceText}>
              Total: {selectedCredit.selectPrice}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              type={'orange'}
              styleButton={styles.button}
              onPress={buyCredits}
              disable={isPurchasing}
            >
              <Spinner isFetching={isPurchasing}>
                <Text style={styles.buttonText}>Purchase Credits</Text>
              </Spinner>
            </Button>
          </View>
        </Spinner>
      </View>
    </View>
  );
}

export default PurchaseCredits;
