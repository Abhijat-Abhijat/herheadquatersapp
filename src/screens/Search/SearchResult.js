import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// core components
import Spinner from '../../components/Spinner';
import SearchHeader from '../../components/Header/SearchHeader';
import Section from '../../components/Collaboration/Section';
import CollaborationBoxPreview from '../../components/Collaboration/CollaborationBoxPreview';
import UserBoxPreview from '../../components/User/UserBoxPreview';
import Icon from '../../components/Icons/HerHeadquartersIcon';
import HeaderCancelSearch from '../../components/Header/HeaderCancelSearch';
import { primaryColor } from '../../assets/jss/styles';
// actions
import {
  getIsFetchingSearch,
  getSearchCollaborations,
  getSearchQuery,
  getSearchUsers,
} from '../../selectors/search';

const styles = StyleSheet.create({
  notFoundWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  shadowContainer: {
    elevation: 1,
    shadowColor: 'black',
    shadowOpacity: 0.31,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 1,
  },
  notFoundContainer: {
    paddingTop: 18,
    paddingBottom: 45,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  notFoundTitle: {
    fontFamily: 'lato-bold',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    color: primaryColor.main,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  notFoundText: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
  },
  boxContainer: {
    marginBottom: 5,
  },
  sectionReset: {
    marginBottom: 0,
  },
  sectionMargin: {
    marginBottom: 5,
    marginTop: 5,
  },
  navigationButtonContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 14,
    paddingVertical: 13,
  },
  navigationButtonText: {
    color: primaryColor.main,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
  },
});

const NavigateButton = ({ text, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.shadowContainer, styles.navigationButtonContainer, style]}
  >
    <Text style={styles.navigationButtonText}>{text}</Text>
  </TouchableOpacity>
);

class Search extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    users: PropTypes.array,
    collaborations: PropTypes.array,
    searchQuery: PropTypes.shape({
      users: PropTypes.string,
      collaborations: PropTypes.string,
    }),
  };

  render() {
    const { isFetching, collaborations, users, searchQuery } = this.props;

    return (
      <Spinner isFetching={isFetching} onCenter>
        {!collaborations.length && !users.length && (
          <View style={styles.notFoundWrapper}>
            <View style={[styles.shadowContainer, styles.notFoundContainer]}>
              <Icon name={'ios-search'} color={primaryColor.main} size={125} />
              <Text style={styles.notFoundTitle}>No Search Results</Text>
              <Text style={styles.notFoundText}>
                Update your search and try again.
              </Text>
            </View>
          </View>
        )}
        {(collaborations.length > 0 || users.length > 0) && (
          <ScrollView>
            {collaborations.length > 0 && (
              <Section
                title={'PARTNERSHIPS'}
                styleHeader={styles.sectionMargin}
                style={styles.sectionReset}
              >
                {collaborations.slice(0, 3).map((collaboration, index) => (
                  <CollaborationBoxPreview
                    key={collaboration._id}
                    collaboration={collaboration}
                    type={'favorite'}
                    styleContainer={{
                      ...styles.shadowContainer,
                      ...styles.boxContainer,
                      marginBottom:
                        index === 2 && collaborations.length < 4
                          ? 0
                          : styles.boxContainer.marginBottom,
                    }}
                  />
                ))}
                {collaborations.length > 3 && (
                  <NavigateButton
                    text={'See All Partnerships'}
                    onPress={() =>
                      this.props.navigation.push('CollaborationsList', {
                        query: searchQuery.collaborations,
                      })
                    }
                  />
                )}
              </Section>
            )}
            {users.length > 0 && (
              <Section
                title={'USERS'}
                styleHeader={styles.sectionMargin}
                style={styles.sectionReset}
              >
                {users.slice(0, 3).map((user, index) => (
                  <UserBoxPreview
                    key={user._id}
                    user={user}
                    styleContainer={{
                      ...styles.shadowContainer,
                      ...styles.boxContainer,
                      marginBottom:
                        index === 2 && users.length < 4
                          ? 24
                          : styles.boxContainer.marginBottom,
                    }}
                  />
                ))}
                {users.length > 3 && (
                  <NavigateButton
                    text={'See All Profiles'}
                    onPress={() =>
                      this.props.navigation.push('ProfileList', {
                        query: searchQuery.users,
                      })
                    }
                    style={{
                      marginBottom: 24,
                    }}
                  />
                )}
              </Section>
            )}
          </ScrollView>
        )}
      </Spinner>
    );
  }
}

export const screenOptions = {
  headerTitle: () => <SearchHeader />,
  headerRight: () => <HeaderCancelSearch />,
};

const mapStateToProps = (state) => ({
  isFetching: getIsFetchingSearch(state).search,
  users: getSearchUsers(state),
  collaborations: getSearchCollaborations(state),
  searchQuery: getSearchQuery(state),
});

export default connect(mapStateToProps)(Search);
