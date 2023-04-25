import moment from 'moment';

export class DateSelectorExtractor {
  startDate;
  endDate;

  constructor(startDateValue, endDateValue) {
    const startDateModifier = DateSelectorExtractor.startCollaborationDateTypes.find(
      (dm) => dm.value === startDateValue,
    );

    const endDateModifier = DateSelectorExtractor.endCollaborationDateTypes.find(
      (dm) => dm.value === endDateValue,
    );

    if (!startDateModifier || !endDateModifier) {
      throw new Error(
        `Invalid DateSelectorExtractor date supplied start: ${startDateModifier}, end: ${endDateModifier}`,
      );
    }

    this.startDate = startDateModifier.getDate().toDate();

    this.endDate = endDateModifier.getDate({ addTo: this.startDate }).toDate();
  }

  getStartDate = () => {
    return this.startDate;
  };

  getEndDate = () => {
    return this.endDate;
  };

  static withinOneWeek = {
    value: 'Within 1 Week',
    label: 'Within 1 Week',
    getDate({ addTo: date } = {}) {
      return moment(date).add(1, 'week');
    },
  };

  static withinTwoWeeks = {
    value: 'Within 2 Weeks',
    label: 'Within 2 Weeks',
    getDate({ addTo: date } = {}) {
      return moment(date).add(2, 'weeks');
    },
  };

  static withinFourWeeks = {
    value: 'Within 4 Weeks',
    label: 'Within 4 Weeks',
    getDate({ addTo: date } = {}) {
      return moment(date).add(4, 'weeks');
    },
  };

  static withinSixWeeks = {
    value: 'Within 6 Weeks',
    label: 'Within 6 Weeks',
    getDate({ addTo: date } = {}) {
      return moment(date).add(6, 'weeks');
    },
  };

  static withinSixMonth = {
    value: 'Within 3 Months',
    label: 'Within 3 Months',
    getDate({ addTo: date } = {}) {
      return moment(date).add(3, 'months');
    },
  };

  static oneWeek = {
    value: '1 Week',
    label: '1 Week',
    getDate({ addTo: date } = {}) {
      return moment(date).add(1, 'week');
    },
  };

  static twoWeeks = {
    value: '2 Weeks',
    label: '2 Weeks',
    getDate({ addTo: date } = {}) {
      return moment(date).add(2, 'weeks');
    },
  };

  static oneMonth = {
    value: '1 Month',
    label: '1 Month',
    getDate({ addTo: date } = {}) {
      return moment(date).add(1, 'month');
    },
  };

  static threeMonths = {
    value: '3 Months',
    label: '3 Months',
    getDate({ addTo: date } = {}) {
      return moment(date).add(3, 'months');
    },
  };

  static sixMonths = {
    value: '6 Months',
    label: '6 Months',
    getDate({ addTo: date } = {}) {
      return moment(date).add(6, 'months');
    },
  };

  static nineMonths = {
    value: '9 Months',
    label: '9 Months',
    getDate({ addTo: date } = {}) {
      return moment(date).add(9, 'months');
    },
  };

  static startCollaborationDateTypes = [
    this.withinOneWeek,
    this.withinTwoWeeks,
    this.withinFourWeeks,
    this.withinSixWeeks,
    this.withinSixMonth,
  ];

  static endCollaborationDateTypes = [
    this.oneWeek,
    this.twoWeeks,
    this.oneMonth,
    this.threeMonths,
    this.sixMonths,
    this.nineMonths,
  ];
}
