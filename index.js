var request = require('request');

function Scrumy(board, pwd, format) {
  var auth = new Buffer(board + ':' + pwd).toString('base64');

  this.urlBase = 'https://scrumy.com/api/';
  this.format = format || 'json';

  // GET methods
  ['Scrumies', 'Sprints', 'Stories', 'Tasks', 'Scrumers', 'Snapshots']
  .forEach(function (resource, index) {
    this['get' + resource] = function (id, cb) {
      makeReq.call(this, 'GET', this.urlBase + resource.toLowerCase() + '/' + id, undefined, cb);
    }
  }.bind(this))

  this.getCurrentSprint = function (cb) {
    makeReq.call(this, 'GET', this.urlBase + 'scrumies/' + board + '/sprints/current', undefined, cb);
  }

  // LIST methods
  var resources = ['Scrumies', 'Sprints', 'Stories', 'Tasks'];
  resources.forEach(function (resource, index) {
    if (index != 0) {
      this['list' + resource] = function (parentId, cb) {
        var parent = resources[index - 1].toLowerCase();
        makeReq.call(this, 'GET', this.urlBase + parent + '/' + parentId + '/' + resource.toLowerCase(), undefined, cb);
      }
    }
  }.bind(this))


  this.listScrumers = function (parentId, cb) {
    makeReq.call(this, 'GET', this.urlBase + 'scrumies/' + parentId + '/scrumers', undefined, cb);
  }

  this.listSnapshots = function (parentId, cb) {
    makeReq.call(this, 'GET', this.urlBase + 'sprints/' + parentId + '/snapshots', undefined, cb);
  }

  function makeReq(method, url, data, cb) {
    //var a = this.board + resource + '.' + this.format;
    //console.log(method, url, data)
    request({
      url: url + '.' + this.format,
      method: method,
      headers: {
        Authorization: 'Basic ' + auth
      },
      body: data
    }, cb);
  }
};

module.exports = Scrumy;