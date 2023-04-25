import React from 'react';
import { View, Text } from 'react-native';
import { Field } from 'redux-form';
// components
import QuizCheckboxRow from './QuizCheckboxRow';
// styles
import { quiz } from 'src/assets/jss/components/quiz';

function OpenToOfferPerksSection() {
  return (
    <View style={quiz.sectionWrapper}>
      <Text style={quiz.sectionTitle}>
        I'm open to partnerships offering these perks
      </Text>
      <View>
        <Field
          name="freeProducts"
          component={QuizCheckboxRow}
          text="Free products"
        />
        <Field
          name="freeServices"
          component={QuizCheckboxRow}
          text="Free services"
        />
        <Field
          name="compensation"
          component={QuizCheckboxRow}
          text="Compensation"
        />
        <Field
          name="pressCoverage"
          component={QuizCheckboxRow}
          text="Press Coverage"
        />
        <Field
          name="socialMediaPromotion"
          component={QuizCheckboxRow}
          text="Social media promotion"
        />
        <Field
          name="sponsorshipPlacement"
          component={QuizCheckboxRow}
          text="Sponsorship placement"
        />
      </View>
    </View>
  );
}

export default OpenToOfferPerksSection;
