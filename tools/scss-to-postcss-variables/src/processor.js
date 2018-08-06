'use-strict';

var fs = require('fs');
var Declaration = require('./declaration');
var DeclarationStore = require('./declarationStore');
var utilities = require('./utilities');

var LINE_DELIMITER = '\n';
var COMMENT_DELIMETER = '//';
var EMPTY_LINES = ['', '\n', '\s'];

function makeObject(declarations) {
  var output = {};

  declarations.forEach(function(declaration) {
    output[utilities.strip$Prefix(declaration.variable.value)] = declaration.value.value;
  });

  return output;
}

function filterLines(line) {
  return EMPTY_LINES.every(function(lineValue) {
    return line !== lineValue && line.slice(0, 2) !== COMMENT_DELIMETER;
  });
}

function normalizeLines(line) {
  var stripped = utilities.stripNewLinesAndSemicolons(line);
  return stripped.trim();
}

function declarationsFromString(path, declarationStore) {
  var data = fs.readFileSync(path, 'utf8');

  var regex = new RegExp(/(^\/\*([\s\S]*?)\*\/|^\/\/.*)/,'gm');
  var lines = String(data).replace(regex,'').split(LINE_DELIMITER).map(normalizeLines).filter(filterLines);

  return lines.map(function(line) {
    return new Declaration(line, declarationStore);
  });
}

function Processor(path) {
  var declarations;
  var declarationStore = new DeclarationStore();

  declarations = declarationsFromString(path, declarationStore);

  this.object = makeObject(declarations);
}

module.exports = Processor;
