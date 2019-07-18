var assert = require('assert');
var sinon = require('sinon'); 
var EventCounter = require('../src/event-counter.js'); 

const A_MILLION = 1000000; 
const A_THOUSAND = 1000; 
const ONE_SECOND = 1000;    // one second = 1000 ms 
const ONE_HOUR = 3600;      // one hour = 3600 s
const SIX_HOUR = 6*ONE_HOUR; 

describe('6 Hours Stress Test (Mock)', function(){
    describe('10 incremental events signals per second', function(){ 
        before(function(){
            var self = this; 
            self.timeout(100000);           //increase timeout for each test case 

            self.clock = sinon.useFakeTimers(); 
            self.numOfTick = A_MILLION;  
            self.testInstance = new EventCounter();
            self.signalNTimes = function(n){
                for(var i=0; i<n; i++){
                    self.testInstance.signal(); 
                }    
            };
            //mocking 5 hours 
            for(var sec=0; sec<=SIX_HOUR; sec++){
                self.clock.tick(ONE_SECOND);    //fast-forward 1 second 
                self.signalNTimes(10*sec);             
            }
        });

        it('should return 216000 events when getCounter(1)', function() {
            var self = this;
            var result = self.testInstance.getCounter(1); 
            assert.equal(result,216000); 
        });
        it('should return 431990 events when getCounter(2)', function() {
            var self = this;
            var result = self.testInstance.getCounter(2); 
            assert.equal(result,216000+215990); 
        });
        it('should return 64351500 events when getCounter(300)', function() {
            var self = this;
            var result = self.testInstance.getCounter(300); 
            assert.equal(result,64351500); 
        });
    });
    
});