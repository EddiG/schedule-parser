# Schedule parser

### Install
```bash
npm install schedule-parser --save
```

### Usage
```js
import parse from 'schedule-parser';

const json = '';
const result = parse(json);
```

### Input
Input JSON consist of keys indicating days of week and corresponding opening hours as values.
One input JSON includes data for one restaurant.
```
{
  <dayofweek>: <opening hours>
  <dayofweek>: <opening hours>
  ...
}
```
`<dayofweek>`: monday / tuesday / wednesday / thursday / friday / saturday / sunday  
`<opening hours>`: an array of objects containing opening hours. Each object consist of two keys:
* type: open or close
* value: opening / closing time as unix time , e.g. 32400 = 9 am, 37800 = 10.30 am,
max value is 86399 = 11.59:59 pm  

###### Example: on Mondays a restaurant is open from 9 am to 8 pm
```
{
  "monday": [
    {
      "type": "open",
      "value": 32400
    },
    {
      "type": "close",
      "value": 72000
    },
    ...
  ]
}
```
##### Special cases:
* If a restaurant is closed the whole day, an array of opening hours is empty,
 e.g. “tuesday”: [] means a restaurant is closed on Tuesdays.
* A restaurant can be opened and closed multiple times during the same day, e.g.
a restaurant is open on Mondays from 9 am - 11 am and from 1 pm to 5 pm.
* A restaurant might not be closed during the same day, e.g. a restaurant is opened on
Friday evening and closed on small hours of Saturday. In that case data of friday includes
only the opening time. Closing time is part of saturday-object. See an example on the next
page.  
When printing such cases, closing time is always a part of the day when a restaurant was
opened (e.g. Friday 8 pm - 1 am)

###### Example
```
{
  "friday": [
    {
      "type": "open",
      "value": 64800
    }
  ],
  "saturday": [
    {
      "type": "close",
      "value": 3600
    },
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
  ]
}
```
A restaurant is open:
```
Friday: 6 pm - 1 am
Saturday: 9 am - 11 am, 4 pm - 11 pm
```

### Output
Opening hours will be printed using 12-hour clock. Example of an output:  
```
Monday: 8 am - 10 am, 11 am - 6 pm  
Tuesday: Closed  
Wednesday: 11 am - 6 pm  
Thursday: 11 am - 6 pm  
Friday: 11 am - 9 pm  
Saturday: 11 am - 9 pm  
Sunday: Closed  
```
