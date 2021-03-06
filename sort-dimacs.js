#!/usr/bin/env node

'use strict'
var commandFiles = require('command-files')
var commander = require('commander')
var dimacs = require('dimacs-parser')
var fs = require('fs')
var path = require('path')

commander.usage('[options] <files>')
commander.version(require('./package.json').version)
commander.parse(process.argv)
var files = commandFiles.expand(commander.args, file => {
	switch (path.extname(file)) {
	case '.cnf':
		return true
	}
})
var sizes = new Map()
for (var file of files) {
	var stats = fs.statSync(file)
	var text = fs.readFileSync(file, 'utf8')
	var p = dimacs.parse(text, file)
	var atoms = new Set()
	for (var clause of p.clauses)
		for (var literal of clause) {
			var polarity = literal.op !== '~'
			var atom = polarity ? literal : literal[0]
			atoms.add(atom)
		}
	sizes.set(file, [
		atoms.size,
		stats.size,
	])
}
files.sort((a, b) => {
	a = sizes.get(a)
	b = sizes.get(b)
	if (a[0] !== b[0])
		return a[0] - b[0]
	return a[1] - b[1]
})
for (var file of files)
	console.log(file)
