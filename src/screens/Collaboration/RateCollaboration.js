import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
// core components
import Spinner from '../../components/Spinner';
import Section from '../../components/Collaboration/Section';
import UserLightBoxPreview from '../../components/User/UserLightBoxPreview';
import CollaborationLightBoxPreview from '../../components/Collaboration/CollaborationLightBoxPreview';
import Rating from '../../components/User/Rating';
import TextField from '../../components/Fields/TextField';
import DatePickerField from '../../components/Fields/DatePickerField';
import Button from '../../components/Buttons/Button';
import { primaryColor } from '../../assets/jss/styles';
// actions
import {
  getCurrentCollaboration,
  getIsFetchingCollaboration,
} from '../../selectors/collaboration';
import {
  getCollaborationRequest,
  rateCollaborationRequest,
} from '../../actions/collaboration';
import { getProfile } from '../../selectors/user';
import { criteriasMap } from '../../actions/utils';

const styles = StyleSheet.create({
  section: {
    marginBottom: 5,
  },
  field: {
    marginBottom: 30,
  },
  dateContainer: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: '#fff',
  },
  criteriaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 26,
    paddingLeft: 18,
    paddingVertical: 11,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  criteriaName: {
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0,
  },
  starsRow: {
    flexDirection: 'row',
  },
  starIcon: {
    marginLeft: 9,
  },
  leaveReviewNote: {
    paddingVertical: 11,
    paddingLeft: 18,
    paddingRight: 16,
  },
  leaveReviewNoteText: {
    lineHeight: 18,
    letterSpacing: 0,
  },
  reviewFormControl: {
    backgroundColor: '#fff',
    minHeight: 275,
    marginVertical: 5,
    padding: 10,
  },
  reviewContentControl: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 29,
    paddingVertical: 18,
  },
  bottomButton: {
    width: 142,
    marginBottom: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 0,
  },
});

class RateCollaboration extends React.PureComponent {
  static propTypes = {
    myId: PropTypes.string,
    collaboration: PropTypes.object,
    isFetchingCollaboration: PropTypes.bool,
    isFetchingRate: PropTypes.bool,
  };

  reviewTextInput = null;

  state = {
    rating: Object.keys(criteriasMap).reduce((acc, criteria) => {
      acc[criteria] = 0;

      return acc;
    }, {}),
    reviewText: null,
    startDate: null,
    endDate: null,
  };

  isCollaborationEmpty = (collaboration) => !collaboration._id;

  getCollaborationUser = (collaboration) => {
    const { myId } = this.props;

    if (this.isCollaborationEmpty(collaboration)) {
      return {};
    }

    if (collaboration.author._id === myId) {
      return collaboration.users[0] || {};
    } else {
      return collaboration.author;
    }
  };

  onStarClick = (criteria) => (number) => {
    this.setState({
      ...this.state,
      rating: {
        ...this.state.rating,
        [criteria]: number,
      },
    });
  };

  renderRatingCriterias = (key, index) => (
    <View key={index} style={styles.criteriaRow}>
      <Text style={styles.criteriaName}>{criteriasMap[key]}</Text>
      <Rating
        value={this.state.rating[key]}
        size={27}
        containerStyle={styles.starsRow}
        iconStyle={styles.starIcon}
        editable
        onPress={this.onStarClick(key)}
      />
    </View>
  );

  onChangeReviewText = (e) => {
    this.setState({
      reviewText: e.nativeEvent.text,
    });
  };

  focusOnReviewInput = () => {
    this.reviewTextInput.focus();
  };

  submit = () => {
    this.props.dispatch(
      rateCollaborationRequest(this.props.collaboration._id, {
        review: {
          criterias: this.state.rating,
          text: this.state.reviewText,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
        },
      }),
    );
  };

  componentDidMount() {
    const { collaboration, route, dispatch } = this.props;

    const idCollaboration = route.params?.idCollaboration;

    if (
      this.isCollaborationEmpty(collaboration) ||
      idCollaboration !== collaboration._id
    ) {
      dispatch(getCollaborationRequest(idCollaboration));
    }
  }

  render() {
    const { collaboration, isFetchingCollaboration, isFetchingRate } =
      this.props;
    const criterias = Object.keys(criteriasMap);

    return (
      <Spinner
        isFetching={
          isFetchingCollaboration || this.isCollaborationEmpty(collaboration)
        }
        onCenter
      >
        <ScrollView>
          <Section title={'YOU COLLABORATED WITH'} style={styles.section}>
            <UserLightBoxPreview
              author={this.getCollaborationUser(collaboration)}
              styleContainer={styles.box}
            />
          </Section>
          <Section title={'YOU COLLABORATED ON'} style={styles.section}>
            <CollaborationLightBoxPreview
              collaboration={collaboration}
              styleContainer={styles.box}
            />
          </Section>
          <Section title={'PARTNERSHIP DATES'} style={styles.section}>
            <View style={styles.dateContainer}>
              <DatePickerField
                input={{
                  onChange: (value) =>
                    this.setState({
                      startDate: value,
                    }),
                  value: this.state.startDate,
                  name: 'startDate',
                }}
                meta={{}}
                label={'START DATE'}
                formControlStyles={styles.field}
              />
              <DatePickerField
                input={{
                  onChange: (value) =>
                    this.setState({
                      endDate: value,
                    }),
                  value: this.state.endDate,
                  name: 'endDate',
                }}
                meta={{}}
                label={'END DATE'}
                formControlStyles={styles.field}
              />
            </View>
          </Section>
          <Section
            title={'PLEASE RATE YOUR PARTNERSHIP'}
            style={styles.section}
          >
            {criterias.map(this.renderRatingCriterias)}
          </Section>
          <Section title={'LEAVE A REVIEW'} style={styles.section}>
            <View style={[styles.box, styles.leaveReviewNote]}>
              <Text style={styles.leaveReviewNoteText}>
                Leave a review about what it was like to work with{' '}
                {this.getCollaborationUser(collaboration).firstName} so that
                others can learn from your experience.
              </Text>
            </View>
            <TouchableOpacity onPress={this.focusOnReviewInput}>
              <TextField
                input={{
                  value: this.state.reviewText,
                  onChange: this.onChangeReviewText,
                }}
                inputProps={{
                  multiline: true,
                  ref: (input) => (this.reviewTextInput = input),
                }}
                meta={{}}
                contentControlStyles={styles.reviewContentControl}
                formControlStyles={styles.reviewFormControl}
              />
            </TouchableOpacity>
            <View style={[styles.box, styles.bottomButtonsContainer]}>
              <Spinner isFetching={isFetchingRate} onCenter>
                <Button
                  type={'secondary'}
                  styleButton={styles.bottomButton}
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Text
                    style={[styles.buttonText, { color: primaryColor.main }]}
                  >
                    Cancel
                  </Text>
                </Button>
                <Button
                  type={'primary'}
                  styleButton={styles.bottomButton}
                  onPress={this.submit}
                >
                  <Text style={styles.buttonText}>Submit Rating</Text>
                </Button>
              </Spinner>
            </View>
          </Section>
        </ScrollView>
      </Spinner>
    );
  }
}

export const screenOptions = {
  title: 'Rate Collaboration',
};

const mapStateToProps = (state) => ({
  myId: getProfile(state)._id,
  collaboration: getCurrentCollaboration(state),
  isFetchingCollaboration: getIsFetchingCollaboration(state).one,
  isFetchingRate: getIsFetchingCollaboration(state).rate,
});

export default connect(mapStateToProps)(RateCollaboration);
