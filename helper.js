const _ = require('lodash');

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const getPrevDay = day => {
  const dayIndex = daysOfWeek.indexOf(day);
  const prevDayIndex = dayIndex === 0 ? daysOfWeek.length - 1 : dayIndex - 1;
  return daysOfWeek[prevDayIndex];
};

exports.getFlatSchedule = schedule => {
  const days = _.keys(schedule);
  let order = 0;

  const getFlatDaySchedule = day => {
    const daySchedule = schedule[day];
    if (_.isArray(daySchedule) && daySchedule.length) {
      return daySchedule.map(time =>
        _.assign({}, time, { day, order: order++ }));
    }
    return [];
  };

  return days.reduce((acc, day) => [...acc, ...getFlatDaySchedule(day)], []);
};

exports.getNormalizedSchedule = flatSchedule => {
  let day = '';
  let state = 'closed';

  const processClosed = time => {
    switch (time.type) {
      case 'close':
        const prevDay = getPrevDay(time.day);

        let order = time.order;
        if (order === 0) {
          const maxOrder = _.maxBy(flatSchedule, t => t.order).order;
          order = maxOrder + 1;
        }

        return _.assign({}, time, { day: prevDay, order });
      case 'open':
      default:
        state = 'opened';
        return time;
    }
  };

  const processOpened = time => {
    switch (time.type) {
      case 'open':
        return null;
      case 'close':
      default:
        state = 'closed';
        return time;
    }
  };

  const normalizedSchedule = flatSchedule.reduce(
    (acc, time) => {
      if (day !== time.day) {
        day = time.day;
        // if a day changed then we must close restaurant
        state = 'closed';
      }
      switch (state) {
        case 'closed':
          return [...acc, processClosed(time)];
        case 'opened':
          return [...acc, processOpened(time)];
        default:
          return [...acc, time];
      }
    },
    []
  );

  return _.sortBy(normalizedSchedule, time => time.order);
};
