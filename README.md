## Event Counter

This library helps to track number of events that happened during a specified window of time. It could be used to track how often a particular webpage is served. The default event observation window is 5 minutes. 

### Requirement 
* Node.js 8.12.0
* npm 6.8.0

### Supported Capcity
* Timestamp granularity in seconds
* Only support in single thread applications

### Installation
To install dependencies: ```npm install ``` in the root direction

### Usage Example 
```javascript
var EventCounter = require('./src/event-counter.js'); 
var eCounter = new EventCount(); 

//to signal an event 
eCounter.signal(); 

//to retrieve number of events occured in the last 10 seconds 
eCounter.getCounter(10); 
```

### API
*   `signal()`- Signal that a single event happened
*   `getCounter(tsInSecond)`- Request the number of events that happened over a user-specified timespan until current time
    *   `tsInSecond` - [Required] Timespan in seconds. It should not be greater than 300 second.

### Run Unit Test 
In the root directory ```npm test```

### Contribution
* Brady Tsai (bradytsai@gmail.com)

