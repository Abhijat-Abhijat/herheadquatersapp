import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image as ImageNative,
  RefreshControl,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { useNavigation } from '@react-navigation/native';
// core components
import Spinner from 'src/components/Spinner';
import Section from 'src/components/Collaboration/Section';
import Icon from 'src/components/Icons/HerHeadquartersIcon';
import Rating from 'src/components/User/Rating';
import Button from 'src/components/Buttons/Button';
import HeaderProfile from 'src/components/Header/HeaderProfile';
import HeaderRightHelperButtonsProfile from 'src/components/Header/HeaderRightHelperButtonsProfile';
import ProfileInfoSlider from 'src/modules/user/containers/ProfileInfoSlider';
// actions
import { addUserToFavoriteRequest, getUserRequest } from 'src/actions/user';
import { joinToChatRequest } from 'src/actions/chat';
import { getTotalReviews } from 'src/selectors/review';
// selectors
import {
  getIsFetchingUser,
  getCurrentUser,
  getFavorites,
  getProfile,
} from 'src/selectors/user';
import { selectUserAccountPlan } from 'src/modules/user/selectors';
// account plan types
import { basic } from 'src/modules/payment/planTypes';
// utils
import {
  getCriteriaKeys,
  getShortState,
  criteriasMap,
} from 'src/actions/utils';
// styles
import {
  blackColor,
  coolGrey,
  paleGrey,
  primaryColor,
} from 'src/assets/jss/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  topAvatar: {
    flex: 1,
    height: 338,
    overflow: 'hidden',
    position: 'relative',
  },
  topEmptyAvatar: {
    flex: 1,
    height: 372,
    overflow: 'hidden',
    position: 'relative',
  },
  topAvatarImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
  },
  infoLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    minWidth: '55%',
    backgroundColor: '#234A5D',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 40,
    borderTopRightRadius: 100,
  },
  infoLabelName: {
    fontFamily: 'lato-bold',
    fontSize: 20,
    lineHeight: 28,
    color: 'white',
  },
  infoLabelPosition: {
    fontFamily: 'lato',
    fontSize: 14,
    lineHeight: 18,
    color: 'white',
  },
  companyName: {
    fontFamily: 'lato-bold',
    fontSize: 14,
    lineHeight: 18,
  },
  introSection: {
    backgroundColor: '#fff',
    zIndex: 100,
    paddingTop: 23,
    paddingBottom: 15,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  simpleText: {
    lineHeight: 18,
    letterSpacing: 0,
    marginTop: 5,
  },
  linkText: {
    lineHeight: 18,
    letterSpacing: 0,
    color: primaryColor.main,
    marginTop: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ratingIcon: {
    marginRight: 6,
  },
  smallRatingNumber: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
    fontFamily: 'lato-bold',
  },
  section: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  infoSection: {
    paddingTop: 15,
    paddingBottom: 34,
  },
  infoFirstContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoItem: {
    marginBottom: 15,
  },
  yearsInBusinessContainer: {
    marginRight: 56,
  },
  label: {
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 2,
  },
  infoText: {
    lineHeight: 18,
    letterSpacing: 0,
  },
  portfolioSection: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 40,
  },
  portfolioContainer: {
    flexDirection: 'row',
  },
  portfolioLabel: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
    marginTop: 4,
    color: blackColor,
  },
  portfolioItem: {
    width: 97,
    height: 97,
    marginRight: 21,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  countReviewsText: {
    marginTop: 8,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  bigRatingContainer: {
    flexDirection: 'row',
  },
  bigRatingIcon: {
    marginRight: 11,
  },
  bigRatingNumber: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
  },
  criteriasContainer: {
    marginTop: 16,
    marginBottom: 21,
  },
  criteriaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  criteriaText: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
  },
  viewAllReviewsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 29,
  },
  viewAllReviewsText: {
    color: primaryColor.main,
    lineHeight: 18,
    letterSpacing: 0,
  },
  emptyRatingContainer: {
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 42,
  },
  emptyRatingTitle: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    textAlign: 'center',
    marginBottom: 32,
  },
  emptyRatingSecondText: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
  },
  profileInfoSlider: {
    marginBottom: 30,
  },
  // <----- collaboration item styles start ----->
  collaborationItemContainer: {
    paddingLeft: 20,
    paddingTop: 12,
    paddingRight: 37,
    paddingBottom: 12,
    borderBottomColor: paleGrey,
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collaborationTitle: {
    fontFamily: 'lato-bold',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 6,
  },
  collaborationInfo: {
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    color: '#fff',
    marginLeft: 13,
  },
});

function CollaborationItem(props) {
  const { collaboration } = props;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CollaborationView', {
          idCollaboration: collaboration._id,
        })
      }
      style={styles.collaborationItemContainer}
    >
      <View>
        <Text style={styles.collaborationTitle}>{collaboration.title}</Text>
        {!collaboration.remote ? (
          <Text style={styles.collaborationInfo}>
            {collaboration.city}
            {collaboration.state && ', '}
            {getShortState(collaboration.state)} | {collaboration.type}
          </Text>
        ) : (
          <Text style={styles.collaborationInfo}>
            Remote | {collaboration.type}
          </Text>
        )}
      </View>
      <Icon name={'ios-arrow-forward'} size={25} color={coolGrey} />
    </TouchableOpacity>
  );
}

class Profile extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    isFetchingFavorite: PropTypes.bool,
    user: PropTypes.object,
    favoritesProfiles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    myId: PropTypes.string,
    totalReviews: PropTypes.number,
    accountPlan: PropTypes.string,
  };

  onRefresh = () => {
    const { navigation, route, dispatch } = this.props;

    const idUser = route.params?.idUser;

    if (!idUser) {
      navigation.goBack();
    }

    dispatch(getUserRequest(idUser));
  };

  componentDidMount() {
    const { navigation } = this.props;

    this.unsubscribeFocusListener = navigation.addListener('focus', () => {
      const { route, dispatch, user } = this.props;

      const idUser = route.params?.idUser;

      if (!idUser) {
        navigation.goBack();
      }

      if (user._id !== idUser) {
        dispatch(getUserRequest(idUser));
      }
    });
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFocusListener) {
      this.unsubscribeFocusListener();
    }
  };

  render() {
    const {
      isFetching,
      user,
      isFetchingFavorite,
      favoritesProfiles,
      myId,
      totalReviews,
      accountPlan,
    } = this.props;

    if (!user) {
      return <Spinner isFetching={true} onCenter />;
    }

    const socialLinksKeys = user.socialLinks
      ? Object.keys(user.socialLinks)
      : [];

    if (!user.rating) {
      user.rating = {};
    }

    const criteriasKeys = getCriteriaKeys(user.rating);

    const isFavorite =
      !!favoritesProfiles[user._id] && !!favoritesProfiles[user._id].firstName;
    const isMyProfile = myId === user._id;

    return (
      <Spinner isFetching={isFetching} onCenter>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
        >
          <View style={user.avatar ? styles.topAvatar : styles.topEmptyAvatar}>
            {user.avatar ? (
              <Image
                uri={user.avatar.src}
                style={styles.topAvatarImage}
                resizeMode={'cover'}
              />
            ) : (
              <ImageNative
                source={require('../../../assets/emptyAvatar.png')}
                style={styles.topAvatarImage}
                resizeMode={'cover'}
              />
            )}
            <View style={styles.infoLabel}>
              <Text style={styles.infoLabelName}>
                {`${user.firstName} ${user.lastName}`}
              </Text>
              <Text style={styles.infoLabelPosition}>{user.position}</Text>
            </View>
          </View>
          <View style={styles.introSection}>
            <Text style={styles.companyName}>{user.companyName}</Text>
            <Text style={styles.simpleText}>
              {user.city}
              {user.state && ', '}
              {getShortState(user.state)}
            </Text>
            {user.rating.total === 0 ? (
              <Text style={styles.simpleText}>
                {user.firstName} is new to HerHeadquarters!
              </Text>
            ) : (
              <View>
                <Text style={styles.simpleText}>Partnership Rating</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 4,
                  }}
                >
                  <Rating
                    value={user.rating.total}
                    containerStyle={styles.ratingContainer}
                    iconStyle={styles.ratingIcon}
                    color={'#234A5D'}
                  />
                  <Text style={styles.smallRatingNumber}>
                    {user.rating.total}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <ProfileInfoSlider profile={user} style={styles.profileInfoSlider} />
          {user.portfolio.length > 0 && (
            <View style={styles.portfolioSection}>
              <Text style={[styles.portfolioLabel, {}]}>PORTFOLIO</Text>
              <View style={styles.portfolioContainer}>
                {user.portfolio.map((image) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('FullScreenImage', {
                        src: image.src,
                      })
                    }
                    key={image._id}
                    style={styles.portfolioItem}
                  >
                    <Image uri={image.src} style={styles.image} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {accountPlan !== basic.name && (
            <Section title={'PARTNERSHIP REVIEWS'}>
              <View style={styles.section}>
                {user.rating.total ? (
                  <React.Fragment>
                    <Text style={styles.countReviewsText}>
                      {totalReviews} review{totalReviews > 1 ? 's' : ''}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}
                    >
                      <Rating
                        value={user.rating.total}
                        containerStyle={styles.bigRatingContainer}
                        iconStyle={styles.bigRatingIcon}
                        size={27}
                      />
                      <Text style={styles.bigRatingNumber}>
                        {user.rating.total}
                      </Text>
                    </View>
                    <View style={styles.criteriasContainer}>
                      {criteriasKeys.map((criteria, index) => (
                        <View key={index} style={styles.criteriaItem}>
                          <Text style={styles.criteriaText}>
                            {criteriasMap[criteria]}
                          </Text>
                          <Rating
                            value={user.rating[criteria]}
                            containerStyle={styles.bigRatingContainer}
                            size={15}
                          />
                        </View>
                      ))}
                    </View>
                    {totalReviews > 0 && (
                      <View style={styles.viewAllReviewsContainer}>
                        <TouchableWithoutFeedback
                          onPress={() =>
                            this.props.navigation.push('ReviewList')
                          }
                        >
                          <Text style={styles.viewAllReviewsText}>
                            View{' '}
                            {totalReviews > 1
                              ? `all ${totalReviews} reviews`
                              : `one review`}
                          </Text>
                        </TouchableWithoutFeedback>
                      </View>
                    )}
                  </React.Fragment>
                ) : user.collaborations.length > 0 ? (
                  <View style={styles.emptyRatingContainer}>
                    <Text style={styles.emptyRatingTitle}>
                      {user.firstName} is new to HerHeadquarters and hasn’t
                      collaborated yet.
                    </Text>
                    <Text style={styles.emptyRatingSecondText}>
                      Check out open partnerships!
                    </Text>
                  </View>
                ) : (
                  <View style={styles.emptyRatingContainer}>
                    <Text style={styles.emptyRatingTitle}>
                      {user.firstName} is new to HerHeadquarters and hasn’t
                      collaborated yet.
                    </Text>
                    {!isMyProfile && (
                      <Text style={styles.emptyRatingSecondText}>
                        Send a message and collaborate!
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </Section>
          )}
          {user.collaborations.length > 0 && (
            <Section title={'OPEN PARTNERSHIPS'}>
              {user.collaborations.slice(0, 2).map((collaboration) => (
                <CollaborationItem
                  key={collaboration._id}
                  collaboration={collaboration}
                />
              ))}
              {user.collaborations.length > 2 ? (
                <View
                  style={[
                    styles.section,
                    styles.viewAllReviewsContainer,
                    { marginTop: 13 },
                  ]}
                >
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.push('UserCollaborationsList', {
                        idUser: user._id,
                      })
                    }
                  >
                    <Text style={styles.viewAllReviewsText}>
                      View More Partnerships
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              ) : (
                <View
                  style={[
                    styles.section,
                    styles.viewAllReviewsContainer,
                    { marginTop: 13 },
                  ]}
                />
              )}
            </Section>
          )}
          {!isMyProfile && (
            <View style={styles.section}>
              <Button
                type={isFavorite ? 'danger' : 'success'}
                styleButton={styles.buttonContainer}
                onPress={() =>
                  this.props.dispatch(addUserToFavoriteRequest(user._id))
                }
              >
                <Spinner isFetching={isFetchingFavorite} color={'#fff'}>
                  <React.Fragment>
                    <Icon
                      name={isFavorite ? 'ios-heart' : 'ios-heart-empty'}
                      size={25}
                      color={'#fff'}
                    />
                    <Text style={styles.buttonText}>
                      {isFavorite
                        ? 'Remove Profile from Favorites'
                        : 'Save Profile to Favorites'}
                    </Text>
                  </React.Fragment>
                </Spinner>
              </Button>
              <Button
                type={'primary'}
                styleButton={styles.buttonContainer}
                onPress={() =>
                  this.props.dispatch(
                    joinToChatRequest(
                      user._id,
                      `${user.firstName} ${user.lastName}`,
                      true,
                    ),
                  )
                }
              >
                <Icon name={'ios-chatboxes'} size={25} color={'#fff'} />
                <Text style={styles.buttonText}>Send Message</Text>
              </Button>
            </View>
          )}
        </ScrollView>
      </Spinner>
    );
  }
}

export const screenOptions = {
  headerTitle: ({ style }) => <HeaderProfile style={style} />,
  headerRight: () => <HeaderRightHelperButtonsProfile />,
};

const mapStateToProps = (state) => ({
  isFetching: getIsFetchingUser(state).one,
  isFetchingFavorite: getIsFetchingUser(state).favorite,
  user: getCurrentUser(state),
  favoritesProfiles: getFavorites(state).hashProfiles,
  myId: getProfile(state)._id,
  accountPlan: selectUserAccountPlan(state),
  totalReviews: getTotalReviews(state),
});

export default connect(mapStateToProps)(Profile);
