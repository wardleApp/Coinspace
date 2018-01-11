'use strict';

var app = require('../server/server.js');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('API Tests', function() {
  describe('# Get initial', function() {
    it('should get historical data', function(done) {
      request(app).get('/init').end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        // expect(res.body.length).to.equal(4);
        done();
      });
    });
  });

  describe('# Get update', function() {
    it('should update coins', function(done) {
      request(app).get('/update').end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(4);
        done();
      });
    });
  });
  // var task = {
  //   name: 'integration test'
  // };
  // describe('## Create task ', function() {
  //   it('should create a task', function(done) {
  //     request(app) .post('/tasks') .send(task) .end(function(err, res) {
  //       expect(res.statusCode).to.equal(200);
  //       expect(res.body.name).to.equal('integration test');
  //       task = res.body;
  //       done();
  //     });
  //   });
  // });
});
