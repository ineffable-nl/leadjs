banner = """

LeadJS
- functional Javascript

"""

color = process.env.TERM?

files = [
  'build'
  'src'
]

fs = require 'fs'
{print} = require 'util'
{spawn, exec} = require 'child_process'


task 'all',    'build, docs, tests',        -> all done
task 'docs',   'generate docsumentation',   -> docs()
task 'build',  'compile source',            -> build done
task 'sbuild', 'compile source, run test',  -> build -> tests done
task 'watch',  'compile and watch',         -> build true, done
task 'tests',  'run tests',                 -> tests done
task 'bench',  'run benchmarks',            -> bench done
task 'clean',  'clean generated files',     -> clean done


all = -> build -> docs -> tests done

# TODO: why need two times docco ;(
docs = (callback) ->
  log "### Generating documentation", green
  
  if moduleExists 'docco'
    walk 'src', (err, files) ->
      # console.log err, files
      launch 'docco', ([
        '-l', 'parallel'
        ].concat files
      ), ->
        launch 'docco', ([
          '-t', './resources/docs/docco.jst'
          '-c', './resources/docs/docco.css'
          ].concat files
        ), ->
          log "[V] Generated documentation\n", lightGreen
      do callback if callback?


build = (watch, callback) ->
  log "### Building LeadJS lib, modules, tests, bench", green

  if typeof watch is 'function'
    callback = watch
    watch = false

  options = ['-b', '-m', '-o' ].concat files
  options.unshift '-w' if watch
  
  launch 'coffee', options, (status, stdout, stderr) ->
    if status is 0
      log "[V] Done building LeadJS\n", lightGreen
      do callback if callback?
    else
      log "[X] Building LeadJS failed\n", lightRed
      log stdout, lightGreen
      log stderr, lightRed
    

tests = (callback) ->
  log "### Running tests", green
  app = spawn "mocha", [
    "--compilers", "coffee:coffee-script"
    "--reporter", "spec"
    "-#{if color then 'c' else 'C'}"
    "src/tests/*"
  ]
  
  app.stdout.pipe process.stdout
  app.stderr.pipe process.stderr
  
  app.on "exit", ->
    callback()

bench = (callback) ->
  log "### Running benchmarks", green
  $files = [ ]
  
  walk "src/bench", (err, files) ->
    runScriptsSynchronous files, callback


clean = (callback) ->
  try
    deleteFolderRecursive "build"
    deleteFolderRecursive "docs"
    callback?()
  catch err




try
  which = require('which').sync
catch err
  if process.platform.match(/^win/)?
    console.log 'WARNING: the which module is required for windows'
    console.log 'try: npm install which'
  which = null

# ANSI Terminal Colors
ansi = (one, two) ->
  if two? and two
    "\u001b[#{one};#{two}m"
  else
    "\u001b[0m"


if color is true
  reset      = ansi 0
  bold       = ansi 0,  1
  black      = ansi 0, 30
  lightRed   = ansi 1, 31
  red        = ansi 0, 31
  lightGreen = ansi 1, 32
  green      = ansi 0, 32
  lightGray  = ansi 0, 37
  darkGray   = ansi 1, 30

log = (message, color, explanation) ->
  console.log "
#{(color or '')}
#{message} 
 #{(if color? then reset else '')}
#{(explanation or '')}"

log banner, bold

somethingFailed = false
done = -> 
  log ""
  if somethingFailed is true
    log "[X] Something went wrong", lightRed
  else
    log "[V] Done", lightGreen

  log ""




walk = (dir, done) ->
  results = []
  fs.readdir dir, (err, list) ->
    return done(err, []) if err
    pending = list.length
    return done(null, results) unless pending
    
    for name in list
      continue if name.indexOf(".") is 0
      file = "#{dir}/#{name}"
      try
        stat = fs.statSync file
      catch err
        stat = null
      if stat?.isDirectory()
        walk file, (err, res) ->
          results.push name for name in res
          done(null, results) unless --pending
      else
        results.push file
        done(null, results) unless --pending


unlinkIfCoffeeFile = (file) ->
  if file.match /\.coffee(\.md?)$/
    base = file.replace('src','build')
    fs.unlink base.replace(/\.coffee(.md?)$/, '.js'), -> true
    fs.unlink base.replace(/\.coffee(.md?)$/, '.map'), -> true


deleteFolderRecursive = (path) ->
  if fs.existsSync(path)
    fs.readdirSync(path).forEach (file, index) ->
        curPath = path + "/" + file
        log "[V] remove #{curPath}", red
        
        if fs.statSync(curPath).isDirectory()
          deleteFolderRecursive(curPath)
        else
          fs.unlinkSync(curPath)

  fs.rmdirSync(path);


moduleExists = (name) ->
  try
    require name
  catch err
    log "NPM module \"#{name}\" required: npm install #{name}", red
    false


parseScriptResult = (err, stdout, stderr, cmd, options) ->
  if err?
    if err is 0
      log "[V] PASSED #{options?[0]}", lightGreen
      log stdout
      log stderr, bold
    else
      log "[X] FAILED #{options?[0]}", lightRed
      log stdout
      log stderr, lightRed
      
    err is 0
  else
    log "[*] SKIPPED #{options?[0]}", bold
    false


runScriptsSynchronous = (files, callback) ->
  f = files.shift()
  
  parseScript = ->
    parseScriptResult.apply @, arguments
    if files.length is 0
      do callback
    else
      do -> runScriptsSynchronous(files, callback)

  if f.match /\.coffee(\.md?)$/
    # log "### Running Coffee test #{f}", bold
    launch 'coffee', [f], parseScript
  else if f.match /\.js$/
    # log "### Running Node test #{f}", bold
    launch 'node', [f], parseScript
  else
    parseScript null, '', '', '', [f]


launch = (cmd, options=[], callback) ->
  log "### Executing: #{cmd} #{options.join(' ')}", bold
  # log "```"
  
  stdout = ""
  stderr = ""
  cmd = which(cmd) if which
  app = spawn cmd, options
  
  app.stdout.on 'data', (data) ->
    stdout += data
  
  app.stderr.on 'data', (data) ->
    stderr += data
  
  app.on 'exit', (err) -> 
    # log "```"
    somethingFailed = true if err isnt 0
    callback err, stdout, stderr, cmd, options

