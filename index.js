const fs = require('fs')
const v8Profiler = require('v8-profiler-next')
const Inspector = require('inspector-api')
const inspector = new Inspector()

const title = 'electron-snapshot-experiments'

;(async () => {
  require('time-require')

  console.time('init')

  // console.profile('foo')
  await inspector.profiler.enable()
  await inspector.profiler.start()

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

  console.timeEnd('init')

  const v8Prof = v8Profiler.stopProfiling(title)

  // console.profileEnd('foo')

  const inspectorProf = await inspector.profiler.stop()

  fs.writeFileSync(`${title}-inspector-profile.cpuprofile`, JSON.stringify(inspectorProf))

  v8Prof.export((err, result) => {
    fs.writeFileSync(`${title}-v8-profile.cpuprofile`, result)

    v8Prof.delete()
  })
})()

