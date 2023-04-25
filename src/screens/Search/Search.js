import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// core components
import SearchHeader from '../../components/Header/SearchHeader';
import HeaderCancelSearch from '../../components/Header/HeaderCancelSearch';
import { coolGrey, lightBlueGrey, primaryColor } from '../../assets/jss/styles';
import Icon from '../../components/Icons/HerHeadquartersIcon';
// actions
import { changeSearchText, searchRequest } from '../../actions/search';
import { getProfile } from '../../selectors/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  body: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.31,
    shadowOffset: {
      height: 1,
    },
    shadowRadius: 2,
    borderRadius: 2,
  },
  titleContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 10,
    borderBottomColor: lightBlueGrey,
    borderBottomWidth: 1,
  },
  titleText: {
    color: primaryColor.main,
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  recentList: {
    minHeight: 220,
    paddingBottom: 4,
    paddingTop: 17,
  },
  recentEmptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  recentEmptyListText: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
  },
  recentSearchItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
    paddingHorizontal: 11,
  },
  recentSearchItemText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    marginLeft: 15,
  },
  arrowIcon: {
    position: 'absolute',
    right: 11,
  },
});

class Search extends React.Component {
  state = {
    list: [],
  };

  onPressItem = (text) => () => {
    this.props.dispatch(changeSearchText(text));
    this.props.dispatch(searchRequest(text));
  };

  componentDidMount() {
    this.unsubscribeFocusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        try {
          const { myId } = this.props;

          let mySettings = await AsyncStorage.getItem(myId);

          if (!mySettings) {
            return;
          } else {
            mySettings = JSON.parse(mySettings);
          }

          const list = mySettings.listRecentSearch;

          this.setState({
            list: list || [],
          });
        } catch (e) {}
      },
    );
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFocusListener) {
      this.unsubscribeFocusListener();
    }
  };

  render() {
    const { list } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Recent Searches</Text>
          </View>
          <View style={styles.recentList}>
            {list.length > 0 ? (
              list.map((searchText, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentSearchItemContainer}
                  onPress={this.onPressItem(searchText)}
                >
                  <Icon
                    name={'ios-search'}
                    size={24}
                    color={primaryColor.main}
                  />
                  <Text style={styles.recentSearchItemText}>{searchText}</Text>
                  <Icon
                    name={'ios-arrow-forward'}
                    size={20}
                    color={coolGrey}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.recentEmptyListContainer}>
                <Text style={styles.recentEmptyListText}>
                  Your recent searches will appear here.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export const screenOptions = {
  headerTitle: () => <SearchHeader />,
  headerRight: () => <HeaderCancelSearch />,
};

const mapStateToProps = (state) => ({
  myId: getProfile(state)._id,
});

export default connect(mapStateToProps)(Search);
