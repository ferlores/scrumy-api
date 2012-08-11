var http = require('http');
var assert = require('assert');
var Scrumy = require('../index.js');

var board = 'demo';
var pwd = 'password';

var scrumy = new Scrumy(board, pwd);
scrumy.urlBase = 'http://localhost:8080/';


describe('Scrumy Tests', function () {
  var server;
  before(function (done) {
    server = http.createServer(function (req, res) {
      res.end(req.url);
    }).listen(8080, done);
  });

  describe('Scrumies', function () {
    it('getScrumies', function (done) {
      scrumy.getScrumies('demo', function (er, response, body) {
        assert.equal(body, '/scrumies/demo.json');
        done();
      })
    });
  });

  describe('Sprints', function () {
    it('getSprints', function (done) {
      scrumy.getSprints(1111, function (er, response, body) {
        assert.equal(body, '/sprints/1111.json');
        done();
      })
    });

    it('listSprints', function (done) {
      scrumy.listSprints('demo', function (er, response, body) {
        assert.equal(body, '/scrumies/demo/sprints.json');
        done();
      })
    });

    it('getCurrentSprint', function (done) {
      scrumy.getCurrentSprint(function (er, response, body) {
        assert.equal(body, '/scrumies/demo/sprints/current.json');
        done();
      })
    });
  });

  describe('Stories', function () {
    it('getStories', function (done) {
      scrumy.getStories(2222, function (er, response, body) {
        assert.equal(body, '/stories/2222.json');
        done();
      })
    });

    it('listStories', function (done) {
      scrumy.listStories(3333, function (er, response, body) {
        assert.equal(body, '/sprints/3333/stories.json');
        done();
      })
    });
  });

  describe('Tasks', function () {
    it('getTasks', function (done) {
      scrumy.getTasks(4444, function (er, response, body) {
        assert.equal(body, '/tasks/4444.json');
        done();
      })
    });

    it('listTasks', function (done) {
      scrumy.listTasks(5555, function (er, response, body) {
        assert.equal(body, '/stories/5555/tasks.json');
        done();
      })
    });
  });

  describe('Scrumers', function () {
    it('getScrumers', function (done) {
      scrumy.getScrumers(6666, function (er, response, body) {
        assert.equal(body, '/scrumers/6666.json');
        done();
      })
    });

    it('listScrumers', function (done) {
      scrumy.listScrumers('demo', function (er, response, body) {
        assert.equal(body, '/scrumies/demo/scrumers.json');
        done();
      })
    });
  });

  describe('Snapshots', function () {
    it('getSnapshots', function (done) {
      scrumy.getSnapshots(7777, function (er, response, body) {
        assert.equal(body, '/snapshots/7777.json');
        done();
      })
    });

    it('listSnapshots', function (done) {
      scrumy.listSnapshots(8888, function (er, response, body) {
        assert.equal(body, '/sprints/8888/snapshots.json');
        done();
      })
    });
  });
  after(function (done) {
    server.close(done)
  });
});


/**
 * GET y Lists
 */

//scrumy2.getScrumies('inyourshoes', cb(2));
//scrumy2.listSprints('inyourshoes', cb(2));
//scrumy2.getSprints(261516, cb(2));
//scrumy2.getCurrentSprint(cb(2));
//scrumy2.listStories(261516, cb(2));
//scrumy2.getStories(436300, cb(2));
//scrumy2.listTasks(436300, cb(2));
//scrumy2.getTasks(1604783, cb(2));
//scrumy2.getScrumers('Fernando', cb(2));
//scrumy2.listScrumers('inyourshoes',cb(2));
//scrumy2.getSnapshots(117310, cb(2));
//scrumy2.listSnapshots(261516, cb(2));