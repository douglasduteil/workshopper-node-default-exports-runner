//

var _             = require('lodash')
  , jsdiff        = require('diff')
  , path          = require('path')

module.exports = compareDefaultExportResult;

////

function compareDefaultExportResult(exercise){
  return  exercise
    .addProcessor(_verifyExportFunctionProcessor)
    .addProcessor(_verifyFunctionResultProcessor)
}

////

function _verifyExportFunctionProcessor(mode, callback){
  var submittedFx;
  try {
    submittedFx = require(path.resolve(process.cwd(), this.args[0]))
  } catch (e) {
    return callback(e, false)
  }

  if (typeof submittedFx !== 'function') {
      this.emit('fail', 'fail.must_export_function')
      return callback(new Error('fail.must_export_function'), false)
  }

  callback(null, true)
}

function _verifyFunctionResultProcessor(mode, callback){

  var expectedFunc = require(this.solution);
  var actualFunc = require(path.resolve(process.cwd(), this.args[0]));

  process.stdout.write('\nYour submission results compared to the expected:\n\n');

  var hasFailResults = _.map(this._suite, _runSuite(expectedFunc, actualFunc));

  process.nextTick(function () {
    callback(null, !_.any(hasFailResults, _trustly))
  })
}

////

function _partAddedOrRemoved(part) {
  return Boolean(part.added || part.removed);
}

function _trustly(bool) { return !!bool; }

function _runSuite(expectedFunc, actualFunc) {
  return function(args, title){
    process.stdout.write('\t' + title);

    var diff = jsdiff.diffChars(
      JSON.stringify(expectedFunc(args)),
      JSON.stringify(actualFunc(args) || '')
    );

    var hasFailed = _.any(diff, _partAddedOrRemoved);

    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);
    if (hasFailed){
      process.stderr.write(' # fail '.red + ' - ' + title + '\n');
      process.stdout.write('\n```\n');
      _displayDiff(diff)
      process.stdout.write('\n```\n');
    } else {
      process.stderr.write(' # pass '.green + ' - ' + title);
    }
    process.stdout.write('\n');

    return hasFailed;
  }
}

function _displayDiff(diff){
  diff.forEach(function(part){
    var color = part.added   ? 'green' :
                part.removed ? 'red' : 'grey';
    process.stderr.write(part.value[color]);
  });
}
