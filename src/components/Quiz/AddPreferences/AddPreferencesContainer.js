import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { reduxForm, FormSection } from 'redux-form';
// components
import OpenToSection from './OpenToSection';
import OpenToBrandsSection from './OpenToBrandsSection';
import OpenToOfferPerksSection from './OpenToOfferPerksSection';
import OfferServicesSection from './OfferServicesSection';
import InterestedInSection from './InterestedInSection';
import Button from 'src/components/Buttons/Button';
// actions
import { sendQuizRequest } from 'src/actions/quiz';
// enums
import { industryList } from 'src/components/Fields/enums';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#EFEFF4',
  },
  buttonWrapper: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 17,
    color: '#ffffff',
  },
});

function AddPreferencesContainer({ dispatch }) {
  const handleSubmit = useCallback(() => {
    dispatch(sendQuizRequest());
  }, [dispatch]);

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <FormSection name="openTo">
          <OpenToSection />
        </FormSection>
        <FormSection name="openToCollaborationsWithBrands">
          <OpenToBrandsSection industryList={industryList} />
        </FormSection>
        <FormSection name="openToCollaborationsOffering">
          <OpenToOfferPerksSection />
        </FormSection>
        <FormSection name="canOfferServices">
          <OfferServicesSection />
        </FormSection>
        <FormSection name="interestedInPartner">
          <InterestedInSection />
        </FormSection>
        <View style={styles.buttonWrapper}>
          <Button type="primary" onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const formName = 'quiz';

const defaultOpenToCollaborationsWithBrands = industryList.reduce(
  (acc, industry) => {
    return {
      ...acc,
      [industry.field]: false,
    };
  },
  {},
);

export default reduxForm({
  form: formName,
  initialValues: {
    openTo: {
      localBrandCollaborations: false,
      nationalBrandCollaborations: false,
    },
    openToCollaborationsWithBrands: defaultOpenToCollaborationsWithBrands,
    openToCollaborationsOffering: {
      freeProducts: false,
      freeServices: false,
      compensation: false,
      pressCoverage: false,
      socialMediaPromotion: false,
      sponsorshipPlacement: false,
    },
    canOfferServices: {
      prMediaServices: false,
      eventPlanning: false,
      fashionStylingDesign: false,
      photographyVideographyServices: false,
      publicSpeaking: false,
      other: '',
    },
    interestedInPartner: {
      prMediaServices: false,
      eventPlanning: false,
      fashionStylingDesign: false,
      photographyVideographyServices: false,
      publicSpeaking: false,
      other: '',
    },
  },
})(AddPreferencesContainer);
