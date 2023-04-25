import React from 'react';
import { View, Text } from 'react-native';
// components
import SectionTitleRow from 'src/modules/core/components/SectionTitleRow';
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// helpers
import { formatCollaborationDateToFull } from 'src/actions/utils';
// styles
import { primaryColor } from 'src/assets/jss/styles';
import styles from './CollaborationViewInfoSection.styled';

function CollaborationViewInfoSection({
  totalPartnership,
  startDate,
  endDate,
  overview,
  seeking,
  industry,
  perks,
}) {
  return (
    <View style={styles.container}>
      <SectionTitleRow title={'PARTNERSHIP INFO'} />
      <View style={[styles.infoContainer, styles.insideContainer]}>
        <View style={[styles.center]}>
          <Text style={[styles.simpleText, styles.label]}>
            TOTAL PARTNERSHIP VALUE
          </Text>
          <Text style={[styles.simpleText]}>{totalPartnership || '-'}</Text>
        </View>
        <View style={styles.dateContainer}>
          <View>
            <Text style={[styles.simpleText, styles.label]}>START DATE</Text>
            <Text style={styles.simpleText}>
              {formatCollaborationDateToFull(startDate)}
            </Text>
          </View>
          <View style={styles.endsDate}>
            <Text style={[styles.simpleText, styles.label]}>END DATE</Text>
            <Text style={styles.simpleText}>
              {formatCollaborationDateToFull(endDate)}
            </Text>
          </View>
        </View>
        <Text style={[styles.simpleText, styles.label]}>
          PARTNERSHIP OVERVIEW
        </Text>
        <Text style={(styles.simpleText, styles.labelMargin)}>{overview}</Text>
        <Text style={[styles.simpleText, styles.label]}>
          WHAT SPECIFIC ACTIVITIES WILL THIS PERSON DO?
        </Text>
        <Text style={styles.simpleText}>{seeking}</Text>
        <View style={[styles.perksSeekingContainer]}>
          <View style={styles.seekingContainer}>
            <Text style={[styles.simpleText, styles.label, styles.listTitle]}>
              SEEKING
            </Text>
            {industry.map((ind, key) => {
              return (
                <View key={key} style={styles.seekingOptionContainer}>
                  <Icon
                    name={'ios-checkmark'}
                    size={25}
                    color={primaryColor.main}
                  />
                  <Text
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text>{ind}</Text>
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.perksContainer}>
            <Text style={[styles.simpleText, styles.label, styles.listTitle]}>
              I’M OFFERING...
            </Text>
            {perks.map((perk, key) => (
              <View style={styles.perkContainer} key={key}>
                <View style={styles.perkSeparator} />
                <Text>{perk}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export default CollaborationViewInfoSection;
