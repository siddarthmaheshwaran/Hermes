/*
* React-Toolbox 2.0.0.beta-12 uses postcss for compiling css
* and there for all variables used by react-toolbox need to be
* sent in as object.
* The following code converts all scss variables to an object
* which is then used by postcss.
*/
'use-strict';

var Processor = require('./src/processor');

function scssToPostcssVariables(path) {
  var processor = new Processor(path);
  return processor.object;
}

module.exports = scssToPostcssVariables;
