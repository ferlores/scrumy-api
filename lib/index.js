var request = require('request');

function Scrumy(board, pwd, format) {
  var auth = new Buffer(board + ':' + pwd).toString('base64');

  this.urlBase = 'https://scrumy.com/api/';
  this.format = format || 'json';

  var parent = {
    Sprints: 'Scrumies', 
    Stories: 'Sprints', 
    Tasks: 'Stories', 
    Scrumers: 'Scrumies', 
    Snapshots: 'Sprints'
  };

  ['Scrumies', 'Sprints', 'Stories', 'Tasks', 'Scrumers', 'Snapshots']
  .forEach(function (resource, index) {
    // GET methods
    this['get' + resource] = function (id, cb) {
      makeReq.call(this, 'GET', this.urlBase + resource.toLowerCase() + '/' + id, undefined, cb);
    }

    // LIST methods
    if (parent[resource]) {
      this['list' + resource] = function (parentId, cb) {
        var p = parent[resource].toLowerCase();
        makeReq.call(this, 'GET', this.urlBase + p + '/' + parentId + '/' + resource.toLowerCase(), undefined, cb);
      }
    }
  }.bind(this))

  this.getCurrentSprint = function (cb) {
    makeReq.call(this, 'GET', this.urlBase + 'scrumies/' + board + '/sprints/current', undefined, cb);
  }

  function makeReq(method, url, data, cb) {
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