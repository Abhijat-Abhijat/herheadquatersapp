import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// components
import Button from 'src/components/Buttons/Button';
import Icon from 'src/components/Icons/HerHeadquartersIcon';
// styles
import { primaryColor } from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 15,
  },
  button: {
    width: '40%',
    marginBottom: 0,
  },
  buttonView: {
    color: primaryColor.main,
    fontSize: 17,
  },
  buttonCollaborate: {
    color: '#fff',
    fontSize: 17,
  },
  iconContainer: {
    paddingRight: 14,
  },
});

function PotentialPartnerPreviewBoxFooter(props) {
  const {
    clickViewProfile,
    clickCollaborate,
    addUserToFavorite,
    isUserFavorite,
  } = props;

  return (
    <View style={styles.footer}>
      <Button
        styleButton={styles.button}
        type="secondary"
        onPress={clickViewProfile}
      >
        <Text style={styles.buttonView}>View Profile</Text>
      </Button>
      <Button
        styleButton={styles.button}
        type="primary"
        onPress={clickCollaborate}
      >
        <Text style={styles.buttonCollaborate}>Partner</Text>
      </Button>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={addUserToFavorite}
      >
        <Icon
          name={isUserFavorite ? 'ios-heart' : 'ios-heart-empty'}
          size={28}
          color={primaryColor.main}
        />
      </TouchableOpacity>
    </View>
  );
}

PotentialPartnerPreviewBoxFooter.propTypes = {
  clickViewProfile: PropTypes.func,
  clickCollaborate: PropTypes.func,
  addUserToFavorite: PropTypes.func,
  isUserFavorite: PropTypes.bool,
};

export default memo(PotentialPartnerPreviewBoxFooter);
