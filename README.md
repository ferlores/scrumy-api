# scrumy-api
Simple wrapper for [scrumy api](http://apidoc.scrumy.com/wiki/show/REST+API). For the moment work only with get/list methods

## Instalation
```
npm install scrumy-api
```

## Usage
```javascript
var Scrumy = require('scrumy-api')
var scrumy = new Scrumy('board', 'secret')

scrumy.listSprints('board', function(err, res, sprints){
  scrumy.listStories(sprints[0].id, function (err, res, stories) {
    stories.forEach(function(story){
      console.log(story.id);
    })
  })
})

scrumy.listCurrentSprint(function(err, res, current){
  console.log(current.sprint.stories[0].tittle)
})
```

## Methods
```javascript
var Scrumy = require('scrumy-api')
var scrumy = new Scrumy('board', 'secret')
```

### Scrumies - [API](http://w3w.scrumy.com/wiki/show/Scrumies)
* ```scrumy.getScrumies(board, callback)```

### Sprints - [API](http://w3w.scrumy.com/wiki/show/Sprints)
* ```scrumy.listSprints(board, callback)```
* ```scrumy.getSprints(sprintID, callback)```
* ```scrumy.getCurrentSprint(callback)```

### Stories - [API](http://w3w.scrumy.com/wiki/show/Stories)
* ```scrumy.listStories(sprintID, callback)```
* ```scrumy.getStories(storyID, callback)```

### Tasks - [API](http://w3w.scrumy.com/wiki/show/Tasks)
* ```scrumy.listTasks(storyID, callback)```
* ```scrumy.getTasks(taskID, callback)```

### Scrumers - [API](http://w3w.scrumy.com/wiki/show/Scrumers)
* ```scrumy.listScrumers(board, callback)```
* ```scrumy.getScrumers(scrumerID, callback)```

### Snapshots - [API](http://w3w.scrumy.com/wiki/show/Snapshots)
* ```scrumy.listSnapshots(sprintID, callback)```
* ```scrumy.getSnapshots(snapshotID, callback)```

## Test
* ```npm test```

## Coverage
* ```npm run-script jscov```
* ```npm run-script cov-report```
* ```chromium-browser test/coverage.html```

## License
MIT