'use strict';

var fs = require('fs');
var path = require('path');
var archiver = require('archiver');
var manifest = require('../manifest');

var rootDir = path.resolve(__dirname, '..');
var archive = archiver.create('zip', {});

var outFile = 'view-background-image-v' + manifest.version + '.zip';
var output = fs.createWriteStream(path.join(rootDir, 'build', outFile));

archive.pipe(output);

[
    'LICENSE',
    'background.js',
    'content.js',
    'manifest.json'
].forEach(function(file) {
    archive.file(path.join(rootDir, file), { name: path.basename(file) });
});

archive
    .directory(path.join(rootDir, 'icons'), 'icons')
    .finalize();
