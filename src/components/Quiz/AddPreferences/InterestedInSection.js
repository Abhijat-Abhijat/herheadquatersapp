import React from 'react';
import { View, Text } from 'react-native';
import { Field } from 'redux-form';
// components
import QuizCheckboxRow from './QuizCheckboxRow';
import QuizOtherRow from './QuizOtherRow';
// styles
import { quiz } from '../../../assets/jss/components/quiz';

function InterestedInSection() {
  return (
    <View style={quiz.sectionWrapper}>
      <Text style={quiz.sectionTitle}>
        I'm interested in partners that can offer these services
      </Text>
      <View>
        <Field
          name="prMediaServices"
          component={QuizCheckboxRow}
          text="PR/media services"
        />
        <Field
          name="eventPlanning"
          component={QuizCheckboxRow}
          text="Event planning"
        />
        <Field
          name="fashionStylingDesign"
          component={QuizCheckboxRow}
          text="Fashion styling/design"
        />
        <Field
          name="photographyVideographyServices"
          component={QuizCheckboxRow}
          text="Photography/videography services"
        />
        <Field
          name="publicSpeaking"
          component={QuizCheckboxRow}
          text="Public speaking"
        />
        <Field name="other" component={QuizOtherRow} />
      </View>
    </View>
  );
}

export default InterestedInSection;
