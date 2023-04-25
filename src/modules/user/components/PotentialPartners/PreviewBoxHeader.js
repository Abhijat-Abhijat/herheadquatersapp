import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// components
import Icon from 'src/components/Icons/HerHeadquartersIcon';
import PremiumPlusBadge from 'src/modules/core/components/PremiumPlusBadge';
// styles
import { blackColor, blackColorBlended } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeftFirstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3,
    flexWrap: 'wrap',
  },
  headerLeftSecondRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    marginTop: 2,
  },
  titleText: {
    fontSize: 18,
    lineHeight: 32,
  },
  badge: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  simpleText: {
    fontSize: 15,
    lineHeight: 28,
  },
  blackText: {
    color: blackColor,
  },
  blendedBlackText: {
    color: blackColorBlended(0.8),
  },
});

function PotentialPartnerPreviewBoxHeader(props) {
  const { fullName, companyName, position, toggleModal, showBadge } = props;

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.headerLeftFirstRow}>
          <Text style={[styles.blackText, styles.titleText]}>
            {companyName}
          </Text>
        </View>
        <View style={styles.headerLeftSecondRow}>
          <Text style={[styles.blendedBlackText, styles.simpleText]}>
            {fullName}
            {position && `, ${position}`}
          </Text>
          {showBadge && <PremiumPlusBadge style={styles.badge} />}
        </View>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={toggleModal}>
          <Icon name={'ios-more'} size={28} color={'#000000'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

PotentialPartnerPreviewBoxHeader.propTypes = {
  fullName: PropTypes.string,
  companyName: PropTypes.string,
  address: PropTypes.string,
  toggleModal: PropTypes.func,
  showBadge: PropTypes.bool,
};

export default memo(PotentialPartnerPreviewBoxHeader);
