//

var exercise   = require('workshopper-exercise/exercise')()
  , filecheck  = require('workshopper-exercise/filecheck')
  , execute    = require('workshopper-exercise/execute')
  , _          = require('lodash')
  , comparator = require('./compareDefaultExportsResult')

module.exports = runner;

////

function runner(input){
  var setupInputs = _.partialRight(_setupInputs, input);
  return _.flow(
      filecheck
    , setupInputs
    , execute
    , comparator
  )(exercise);
}

////

function _setupInputs(exercise, suite){
  exercise._suite = suite;
  return exercise;
}
