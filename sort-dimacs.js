#!/usr/bin/env node

'use strict'
var commandFiles = require('command-files')
var commander = require('commander')
var dimacs = require('dimacs-parser')
var fs = require('fs')

commander.usage('[options] <files>')
commander.version(require('./package.json').version)
commander.parse(process.argv)
var sizes = new Set()
var files = commandFiles.expand(commander.args, file => {
	switch (path.extname(file)) {
	case '.cnf':
		return true
	}
})
for (var file of files) {
	var text = fs.readFileSync(file, 'utf8')
	var p = dimacs.parse(text, file)
	var atoms = new Set()
	for (var clause of clauses)
		for (var literal of clause) {
			var polarity = literal.op !== '~'
			var atom = polarity ? literal : literal[0]
			atoms.add(atom)
		}
}
