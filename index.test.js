const _ = require('lodash');
const parser = require('./index');

test('parser should be a function', () => {
  expect(typeof parser).toEqual('function');
});

test('parser should return a string', () => {
  expect(typeof parser()).toEqual('string');
});

test('parser should return empty string if json input is incorrect', () => {
  const input = 'this is an incorrect json input';
  expect(parser(input)).toEqual('');
});

test('parser should return "Closed" if array of times is empty', () => {
  const input = `
    {
      "monday": [],
      "tuesday": [],
      "wednesday": [],
      "thursday": [],
      "friday": [],
      "saturday": [],
      "sunday": []
    }
  `;
  const expected = _.trim(
    `Monday: Closed
Tuesday: Closed
Wednesday: Closed
Thursday: Closed
Friday: Closed
Saturday: Closed
Sunday: Closed`
  );
  const result = parser(input);
  expect(result).toEqual(expected);
});

test('parser should return human readable times', () => {
  const input = `
    {
      "monday": [
	{
	  "type": "close",
	  "value": 3600
	}
      ],
      "tuesday": [
	{
	  "type": "open",
	  "value": 36000
	},
	{
	  "type": "close",
	  "value": 64800
	}
      ],
      "wednesday": [
	{
	  "type": "open",
	  "value": 32400
	},
	{
	  "type": "close",
	  "value": 39600
	},
	{
	  "type": "open",
	  "value": 57600
	},
	{
	  "type": "close",
	  "value": 82800
	}
      ],
      "thursday": [],
      "friday": [
	{
	  "type": "open",
	  "value": 37800
	}
      ],
      "saturday": [
	{
	  "type": "close",
	  "value": 7200
	},
	{
	  "type": "open",
	  "value": 43200
	},
	{
	  "type": "close",
	  "value": 39600
	},
	{
	  "type": "open",
	  "value": 57600
	},
	{
	  "type": "close",
	  "value": 82800
	}
      ],
      "sunday": [
	{
	  "type": "open",
	  "value": 57600
	}
      ]
    }
  `;
  const expected = _.trim(
    `Monday: Closed
Tuesday: 10 am - 6 pm
Wednesday: 9 am - 11 am, 4 pm - 11 pm
Thursday: Closed
Friday: 10.30 am - 2 am
Saturday: 12 am - 11 am, 4 pm - 11 pm
Sunday: 4 pm - 1 am`
  );
  const result = parser(input);
  expect(result).toEqual(expected);
});
