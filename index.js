module.exports = process.env.SCRUMY_COV
   ? require('./lib-cov')
   : require('./lib');