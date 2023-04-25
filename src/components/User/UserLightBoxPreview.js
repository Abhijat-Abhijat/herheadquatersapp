import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// components
import Avatar from 'src/components/User/Avatar';
import PremiumPlusBadge from 'src/modules/core/components/PremiumPlusBadge';
// styles
import { primaryColor } from 'src/assets/jss/styles';
// helpers
import { getShortState } from 'src/actions/utils';
// account plan types
import { premiumPlus } from 'src/modules/payment/planTypes';

const styles = StyleSheet.create({
  simpleText: {
    lineHeight: 18,
    letterSpacing: 0,
  },
  authorContainer: {
    paddingLeft: 26,
    paddingRight: 26,
    paddingBottom: 18,
    paddingTop: 15,
    flexDirection: 'row',
  },
  authorInfoContainer: {
    marginLeft: 30,
    paddingTop: 10,
    flex: 1,
  },
  authorTitle: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  authorName: {
    fontFamily: 'lato-bold',
    lineHeight: 18,
    letterSpacing: 0,
    fontSize: 17,
    flexShrink: 1,
    paddingRight: 10,
  },
  badge: {
    flexShrink: 1,
  },
  linkToProfile: {
    color: primaryColor.main,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
});

class UserLightBoxPreview extends React.PureComponent {
  static propTypes = {
    author: PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatar: PropTypes.shape({
        src: PropTypes.string,
      }),
      city: PropTypes.string,
      state: PropTypes.string,
    }),
    styleContainer: PropTypes.object,
  };

  render() {
    const { author, styleContainer } = this.props;

    const showBadge = author?.plan === premiumPlus.name;

    return (
      <View style={[styles.authorContainer, styleContainer]}>
        <Avatar
          name={`${author.firstName} ${author.lastName}`}
          size={130}
          avatar={author.avatar}
          idUser={author._id}
        />
        <View style={styles.authorInfoContainer}>
          <View style={styles.authorTitle}>
            <Text style={styles.authorName}>
              {`${author.firstName} ${author.lastName}`}
            </Text>
            {showBadge && <PremiumPlusBadge style={styles.badge} />}
          </View>
          <Text style={[styles.simpleText, { marginBottom: 4 }]}>
            {author.companyName}
          </Text>
          <Text style={[styles.simpleText, { marginBottom: 4 }]}>
            {author.city}
            {author.state && ', '}
            {getShortState(author.state)}
          </Text>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.push('Profile', {
                idUser: author._id,
              })
            }
          >
            <Text
              style={styles.linkToProfile}
            >{`View ${author.firstName}'s profile`}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default withNavigation(UserLightBoxPreview);
