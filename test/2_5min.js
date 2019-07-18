var assert = require('assert');
var sinon = require('sinon'); 
var EventCounter = require('../src/event-counter.js'); 

const A_MILLION = 1000000; 
const A_THOUSAND = 1000; 
const ONE_SECOND = 1000; 


describe('5 Minutes Test (Mock)', function(){
    describe('1M events signals per second', function(){ 
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
            //mocking 5 minutes 
            for(var sec=0; sec<300; sec++){
                self.clock.tick(ONE_SECOND);    //fast-forward 1 second 
                self.signalNTimes(A_MILLION);             
            }
        });

        it('should return 1M events when getCounter(1)', function() {
            var self = this;
            var result = self.testInstance.getCounter(1); 
            assert.equal(result,self.numOfTick); 
        });
        it('should return 2M events when getCounter(2)', function() {
            var self = this;
            var result = self.testInstance.getCounter(2); 
            assert.equal(result,self.numOfTick*2); 
        });
        it('should return 300M events when getCounter(300)', function() {
            var self = this;
            var result = self.testInstance.getCounter(300); 
            assert.equal(result,self.numOfTick*300); 
        });
    });
    describe('1K incremental events signal',function(){
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
            //mocking 30 second 
            for(var sec=0; sec<30; sec++){
                self.clock.tick(ONE_SECOND);  //fast-forward 1 second 
                self.signalNTimes(sec*A_THOUSAND);             
            }
        });
        it('should return 29K events when getCounter(1)', function() {
            var self = this;
            var result = self.testInstance.getCounter(1); 
            assert.equal(result,A_THOUSAND*29); 
        });
        it('should return 57K events when getCounter(2)', function() {
            var self = this;
            var result = self.testInstance.getCounter(2); 
            assert.equal(result,A_THOUSAND*57); 
        });
        it('should return 435K events when getCounter(30)', function() {
            var self = this;
            var result = self.testInstance.getCounter(30); 
            assert.equal(result,A_THOUSAND*435); 
        });
    });
});