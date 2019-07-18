const DEFAULT_OBSERVATION_TIME = 300; //5 minutes

function EventCounter(){
    this.maxTime = DEFAULT_OBSERVATION_TIME;
    this.numOfEvents = [];
    this.lastTimestamp = 0; 
    this._init();  
    
};

EventCounter.prototype._init = function(){
    var self = this; 
    self.lastTimestamp = Math.floor(Date.now()/1000); //in seconds 
    self._initRecords(); 
};

EventCounter.prototype._initRecords = function(){
    var self = this; 
    for(var i=0; i<self.maxTime; i++){
        self.numOfEvents.push(0); 
    }
}
EventCounter.prototype._updateRecords = function(){
    var self = this; 
    var currTimestamp = Math.floor(Date.now()/1000); 
    if(currTimestamp==self.lastTimestamp) return; 

    var numOfIdxToClean = Math.min(this.maxTime, currTimestamp-self.lastTimestamp); 
    for(var i=0; i<numOfIdxToClean; i++){
        self.numOfEvents.pop();
        self.numOfEvents.unshift(0); 
    }
    self.lastTimestamp = currTimestamp; 
}

// Signal that a single event happened
EventCounter.prototype.signal = function(){
    var self = this; 
    self._updateRecords(); 
    self.numOfEvents[0]++; 
};

// Request the number of events that happened over a user-specified timespan until current time
EventCounter.prototype.getCounter = function(tsInSecond){
    var self = this; 
    if(tsInSecond>300)  throw new Error('timespan should not be greater than 300s'); 

    var sum = 0; 
    self._updateRecords(); 
    for(var i=0; i<tsInSecond; i++){
        sum = sum + self.numOfEvents[i];
    }
    return sum; 
};

module.exports = EventCounter; 
 
