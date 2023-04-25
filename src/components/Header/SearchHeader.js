import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
// hoc
import withNavigation from 'src/modules/core/hocs/withNavigation';
// core components
import Icon from '../Icons/HerHeadquartersIcon';
// actions
import { changeSearchText, searchRequest } from '../../actions/search';
import { getSearchText } from '../../selectors/search';
import { getNavigationState } from '../../selectors/app';

const styles = StyleSheet.create({
  container: {
    width: 213,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  textSearch: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0,
    flexBasis: '70%',
    height: 40,
  },
  iconSearch: {
    opacity: 0.3,
    marginRight: 7,
  },
  iconOptions: {
    position: 'absolute',
    right: 5,
  },
});

class SearchHeader extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  textInput = React.createRef();

  onSubmitEditing = () => {
    this.props.dispatch(searchRequest(this.props.text));
  };

  onFocus = () => {
    this.props.navigation.navigate('Search');
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // console.log(nextProps.currentNavigation.currentRoute, this.props.currentNavigation.currentRoute);
    if (
      nextProps.currentNavigation.currentRoute ===
        this.props.currentNavigation.currentRoute &&
      nextProps.text === this.props.text
    ) {
      return false;
    }

    return true;
  }

  componentDidMount() {
    this.unsubscribeFocusListener = this.props.navigation.addListener(
      'focus',
      () => {
        if (
          this.props.currentNavigation.currentRoute === 'Search' &&
          !this.textInput.current.isFocused()
        ) {
          this.textInput.current.focus();
        }
      },
    );
  }

  componentWillUnmount = () => {
    if (this.unsubscribeFocusListener) {
      this.unsubscribeFocusListener();
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.navigation.navigate('Search')}
      >
        <>
          <Icon
            name={'ios-search'}
            color={'#fff'}
            size={20}
            style={styles.iconSearch}
          />
          <TextInput
            style={styles.textSearch}
            placeholder={'Search'}
            placeholderTextColor={'#fff'}
            autoCapitalize={'none'}
            blurOnSubmit={true}
            onChangeText={(text) => this.props.dispatch(changeSearchText(text))}
            selectionColor={'#fff'}
            spellCheck={false}
            value={this.props.text}
            onSubmitEditing={this.onSubmitEditing}
            onFocus={this.onFocus}
            ref={this.textInput}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Filter')}
            style={styles.iconOptions}
          >
            <Icon name={'ios-options'} color={'#fff'} size={25} />
          </TouchableOpacity>
        </>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => ({
  text: getSearchText(state),
  currentNavigation: getNavigationState(state),
});

SearchHeader = connect(mapStateToProps)(SearchHeader);

export default withNavigation(SearchHeader);
