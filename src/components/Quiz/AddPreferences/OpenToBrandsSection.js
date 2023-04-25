import React from 'react';
import { View, Text } from 'react-native';
import { Field } from 'redux-form';
// components
import QuizCheckboxRow from './QuizCheckboxRow';
// styles
import { quiz } from 'src/assets/jss/components/quiz';

function OpenToBrandsSection({ industryList }) {
  return (
    <View style={quiz.sectionWrapper}>
      <Text style={quiz.sectionTitle}>
        I'm open to partnering with brands in these industries
      </Text>
      <View>
        {industryList.map((industry, index) => (
          <Field
            key={index}
            name={industry.field}
            text={industry.label}
            component={QuizCheckboxRow}
          />
        ))}
      </View>
    </View>
  );
}

export default OpenToBrandsSection;
