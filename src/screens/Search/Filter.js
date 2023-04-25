import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// core components
import Button from '../../components/Buttons/Button';
import Icon from '../../components/Icons/HerHeadquartersIcon';
import HeaderTextButton from '../../components/Header/HeaderTextButton';
import HeaderResetFilter from '../../components/Header/HeaderResetFilter';
import {
  coolGrey,
  lightBlueGrey,
  paleGrey,
  primaryColor,
} from '../../assets/jss/styles';
// actions
import { changeFilter, searchRequest } from '../../actions/search';
import { getCurrentFilter, getSearchText } from '../../selectors/search';
import { industryOptionList, cities } from '../../components/Fields/enums';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  filterContainer: {
    marginTop: 5,
    backgroundColor: '#fff',
  },
  filterTitleContainer: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 15,
    borderBottomColor: paleGrey,
    borderBottomWidth: 1,
  },
  filterTitle: {
    lineHeight: 18,
    letterSpacing: 0,
  },
  filterRowsContainer: {
    paddingTop: 9,
    paddingBottom: 11,
  },
  filterRowContainer: {
    flexDirection: 'row',
    paddingLeft: 18,
    marginBottom: 9,
  },
  filterRowTextContainer: {
    borderBottomColor: lightBlueGrey,
    borderBottomWidth: 1,
    flex: 1,
    paddingBottom: 11,
    marginLeft: 16,
  },
  filterRowText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
  buttonContainer: {
    marginTop: 5,
    paddingHorizontal: 17,
    paddingVertical: 18,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
    color: '#fff',
  },
});

const FilterSection = ({ children, title }) => (
  <View style={styles.filterContainer}>
    <View style={styles.filterTitleContainer}>
      <Text style={styles.filterTitle}>{title}</Text>
    </View>
    <View style={styles.filterRowsContainer}>{children}</View>
  </View>
);

class Filter extends React.Component {
  static propTypes = {
    filters: PropTypes.shape({
      city: PropTypes.arrayOf(PropTypes.string),
      industry: PropTypes.arrayOf(PropTypes.string),
    }),
    currentSearchText: PropTypes.string,
  };

  state = {
    filters: {
      industry: [],
      city: [],
    },
  };

  changeFilter = (name, value) => {
    let currentFilter = [...this.state.filters[name]];
    const index = currentFilter.indexOf(value);

    if (index !== -1) {
      currentFilter.splice(index, 1);
    } else {
      currentFilter = [value, ...currentFilter];
    }

    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        [name]: currentFilter,
      },
    });
  };

  applyFilters = () => {
    const { dispatch, currentSearchText } = this.props;

    Object.keys(this.state.filters).forEach((filterName) => {
      dispatch(changeFilter(filterName, this.state.filters[filterName]));
    });

    dispatch(
      searchRequest(currentSearchText, {
        ...this.state.filters,
      }),
    );
  };

  renderRow = (name, { value }) => {
    const { filters } = this.state;

    return (
      <View key={value} style={styles.filterRowContainer}>
        <TouchableOpacity
          onPress={() => this.changeFilter(name, value)}
          style={{ paddingTop: 3 }}
        >
          {filters[name].includes(value) ? (
            <Icon
              name={'ios-checkmark-circle'}
              size={22}
              color={primaryColor.main}
            />
          ) : (
            <Icon name={'ios-checkbox-standard'} size={22} color={coolGrey} />
          )}
        </TouchableOpacity>
        <View style={styles.filterRowTextContainer}>
          <Text style={styles.filterRowText}>{value}</Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.unsubscribeFocusListener = this.props.navigation.addListener(
      'focus',
      () => {
        this.setState({
          filters: this.props.filters,
        });
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
      <ScrollView contentContainerStyle={styles.container}>
        <FilterSection title={'INDUSTRY'}>
          {industryOptionList.map((industry) =>
            this.renderRow('industry', industry),
          )}
        </FilterSection>
        <FilterSection title={'LOCATION'}>
          {cities?.map((city) => this.renderRow('city', city))}
        </FilterSection>
        <View style={styles.buttonContainer}>
          <Button styleButton={{ marginBottom: 0 }} onPress={this.applyFilters}>
            <Text style={styles.buttonText}>Apply Search Filters</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export const screenOptions = ({ navigation }) => ({
  headerRight: () => <HeaderResetFilter />,
  title: 'Filter',
  headerLeft: () => (
    <HeaderTextButton onPress={() => navigation.goBack()} title={'Back'} />
  ),
});

const mapStateToProps = (state) => ({
  filters: getCurrentFilter(state),
  currentSearchText: getSearchText(state),
});

export default connect(mapStateToProps)(Filter);
