const _ = require('lodash');
const getFlatSchedule = require('./helper').getFlatSchedule;
const getNormalizedSchedule = require('./helper').getNormalizedSchedule;

test('getFlatSchedule should return flat schedule', () => {
  const schedule = {
    monday: [
      {
        type: 'open',
        value: 36000,
      },
      {
        type: 'close',
        value: 64800,
      },
    ],
    tuesday: [
      {
        type: 'open',
        value: 43200,
      },
      {
        type: 'close',
        value: 75600,
      },
    ],
  };
  const expected = [
    {
      day: 'monday',
      type: 'open',
      value: 36000,
      order: 0,
    },
    {
      day: 'monday',
      type: 'close',
      value: 64800,
      order: 1,
    },
    {
      day: 'tuesday',
      type: 'open',
      value: 43200,
      order: 2,
    },
    {
      day: 'tuesday',
      type: 'close',
      value: 75600,
      order: 3,
    },
  ];
  expect(getFlatSchedule(schedule)).toEqual(expected);
});

test('getNormalizedSchedule should return normalized schedule', () => {
  const schedule = [
    {
      day: 'monday',
      type: 'close',
      value: 3600,
      order: 0,
    },
    {
      day: 'monday',
      type: 'open',
      value: 36000,
      order: 1,
    },
    {
      day: 'monday',
      type: 'close',
      value: 57600,
      order: 2,
    },
    {
      day: 'monday',
      type: 'open',
      value: 64800,
      order: 3,
    },
    {
      day: 'tuesday',
      type: 'close',
      value: 3600,
      order: 4,
    },
    {
      day: 'tuesday',
      type: 'open',
      value: 43200,
      order: 5,
    },
    {
      day: 'tuesday',
      type: 'close',
      value: 75600,
      order: 6,
    },
    {
      day: 'sunday',
      type: 'open',
      value: 43200,
      order: 7,
    },
  ];
  const expected = [
    {
      day: 'monday',
      type: 'open',
      value: 36000,
      order: 1,
    },
    {
      day: 'monday',
      type: 'close',
      value: 57600,
      order: 2,
    },
    {
      day: 'monday',
      type: 'open',
      value: 64800,
      order: 3,
    },
    {
      day: 'monday',
      type: 'close',
      value: 3600,
      order: 4,
    },
    {
      day: 'tuesday',
      type: 'open',
      value: 43200,
      order: 5,
    },
    {
      day: 'tuesday',
      type: 'close',
      value: 75600,
      order: 6,
    },
    {
      day: 'sunday',
      type: 'open',
      value: 43200,
      order: 7,
    },
    {
      day: 'sunday',
      type: 'close',
      value: 3600,
      order: 8,
    },
  ];
  expect(getNormalizedSchedule(schedule)).toEqual(expected);
});
