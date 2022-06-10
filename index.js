const fs = require('fs')
const v8Profiler = require('v8-profiler-next')

const title = 'electron-snapshot-experiments'

require('time-require')

console.time('init')

// console.profile('foo')

v8Profiler.setGenerateType(1)

v8Profiler.startProfiling(title, true)

require('bluebird')
require('lodash')
require('ramda')
require('gulp')
require('gulp-complexity')
require('inquirer')
require('rxjs')
require('underscore')
require('eslint')
require('yeoman-generator')

const profile = v8Profiler.stopProfiling(title)

// console.profileEnd('foo')

console.timeEnd('init')

profile.export((err, result) => {
  fs.writeFileSync(`${title}.cpuprofile`, result);
  profile.delete();
})