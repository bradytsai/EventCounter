var assert = require('assert'); 
var sinon = require('sinon'); 
var EventCounter = require('../src/event-counter.js'); 

const A_MILLION = 1000000; 
const A_THOUSAND = 1000; 
const ONE_SECOND = 1000;    // one second = 1000 ms 
const ONE_HOUR = 3600;      // one hour = 3600 s
const SIX_HOUR = 6*ONE_HOUR; 

describe('Simple Test', function(){
    describe('No Signals Test', function(){ 
        before(function(){
            var self = this; 
            self.testInstance = new EventCounter();
        });
        it('should return 0 events when getCounter(1)', function() {
            var self = this;
            var result = self.testInstance.getCounter(1); 
            assert.equal(result,0); 
        });
        it('should return 0 events when getCounter(300)', function() {
            var self = this;
            var result = self.testInstance.getCounter(300); 
            assert.equal(result,0); 
        });
    }); 
    describe('Overload The First 5 Minutes Then Wait 5 Minutes Without Signals',function(){
         before(function(){
            var self = this; 
            self.timeout(100000);           //increase timeout for each test case 
            self.clock = sinon.useFakeTimers(); 
            self.testInstance = new EventCounter();
            self.signalNTimes = function(n){
                for(var i=0; i<n; i++){
                    self.testInstance.signal(); 
                }    
            };
            //mocking 5 minutes with signals
            for(var sec=0; sec<300; sec++){
                self.clock.tick(ONE_SECOND);  //fast-forward 1 second 
                self.signalNTimes(A_MILLION);
            }
            //mocking 5 minutes without signals
            self.clock.tick(300*ONE_SECOND);
        });
        it('should return 0 events when getCounter(300)', function() {
            var self = this;
            var result = self.testInstance.getCounter(300); 
            assert.equal(result,0); 
        });
    }); 
    describe('Check Invalid Argument For GetCounter',function(){
        it('should return correct error message',function(){
            var testInstance = new EventCounter(); 
            // var result = testInstance.getCounter(301); 
            assert.throws(function(){testInstance.getCounter(301)},Error,'timespan should not be greater than 300s');
        });
    })
});

