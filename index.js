const _ = require('lodash');
const flat = require('./helper').getFlatSchedule;
const normalize = require('./helper').getNormalizedSchedule;

//
// Helpers
//
const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const getHumanTime = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = seconds % 3600 / 60;
  const hour = hours % 12;
  return `${hour === 0 ? 12 : hour}${minutes > 0 ? '.' + minutes : ''} ${hours <= 12 ? 'am' : 'pm'}`;
};

const getHumanTimes = times => {
  const sortedTimes = _.sortBy(times, time => time.order);
  const chunkedTimes = _.chunk(sortedTimes, 2);
  const humanTimes = chunkedTimes.reduce(
    (acc, chunk) => [
      ...acc,
      chunk.map(time => getHumanTime(time.value)).join(' - '),
    ],
    []
  );
  return humanTimes.join(', ');
};

const parseJson = json => {
  try {
    return JSON.parse(json);
  } catch (ex) {
    return null;
  }
};

const prepareSchedule = schedule => normalize(flat(schedule));

//
// Export
//
const parser = (json = '{}') => {
  const input = parseJson(json);
  if (_.isNull(input)) {
    return '';
  }

  const schedule = prepareSchedule(input);

  const outputArray = daysOfWeek.reduce(
    (acc, day) => {
      const daySchedule = _.filter(schedule, time => time.day === day);

      if (_.isArray(daySchedule) && daySchedule.length) {
        return [...acc, `${_.capitalize(day)}: ${getHumanTimes(daySchedule)}`];
      }
      return [...acc, `${_.capitalize(day)}: Closed`];
    },
    []
  );

  return outputArray.join('\n');
};

module.exports = parser;
