import React from 'react';
import { View, Text } from 'react-native';
import { Field } from 'redux-form';
// components
import QuizCheckboxRow from './QuizCheckboxRow';
// styles
import { quiz } from 'src/assets/jss/components/quiz';

function OpenToSection() {
  return (
    <View style={quiz.sectionWrapper}>
      <Text style={quiz.sectionTitle}>I'm open to</Text>
      <View>
        <Field
          name="localBrandCollaborations"
          component={QuizCheckboxRow}
          text="Local brand partnership"
        />
        <Field
          name="nationalBrandCollaborations"
          component={QuizCheckboxRow}
          text="National brand partnership"
        />
      </View>
    </View>
  );
}

export default OpenToSection;
