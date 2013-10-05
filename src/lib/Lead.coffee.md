# Lead
We start with a global entry point into the library. This is where all the
magic happens, so your global namespace won't get too polluted.

    Lead = do ->
      modules = []
      

## Prelude
We want to use some functions in every Lead module we are creating, but also
in the Lead library itself.

      #log     = console.log.bind   @, ">"
      str_repeat = (s, n) ->
        (new Array (n+1)).join s
      
      log_ = (prefix, args...) ->
        console.log.apply(@, 
          [str_repeat("  ", groups.length), prefix].concat args)
      error_ = (prefix, args...) ->
        console.error.apply(@, 
          [str_repeat("  ", groups.length), prefix].concat args)
        
      log     = (args...) -> log_.apply   @, [":"].concat(args)
      debug   = (args...) -> log_.apply   @, ["|"].concat(args)
      info    = (args...) -> log_.apply   @, ["#"].concat(args)
      warn    = (args...) -> error_.apply @, ["$"].concat(args)
      error   = (args...) -> error_.apply @, ["!"].concat(args)
      
      groups  = []
      group   = (s, f) ->
        log "#{s}"
        groups.push s
        f()
        groups.pop()
        
        
### Standard types, classes and related functions

      TODO    = (s) -> throw new Error "TODO #{s}"
      
      data    = (d) -> d
      newtype = -> TODO "newtype"
      type    = -> TODO "type"


#### Basic data types

      False   = false
      True    = true
      Bool    = data (a) -> a is True or a is False
      
      otherwise = true
      
      

### List operations

      
      head    = (l) -> l[0]
      last    = (l) -> l[(length l) - 1]
      tail    = (l) -> l.slice  1     unless nil l
      init    = (l) -> l.slice  0, -1 unless nil l
      nil     = (l) -> (length l) is 0
      length  = (l) -> l.length


#### Reducing lists (folds)

      foldr = (l) -> TODO "foldr"


## (private) evalVar
Make a variable able to be evalled.

      evalVar = (v) ->
        if Array.isArray v
          v = "[#{v}]"
        else if typeof v is 'object'
          v = "{#{v}}"
        else
          v
      

## (private) scoped

      scoped = (scope, v) ->
        $eval = 
          """
          ((function() {
            #{("var #{k} = #{evalVar scope[k]}" for k of scope).join("\n  ")}
            return ( #{evalVar v} )
          })())
          """
        
        try
          eval $eval
        catch e
          error ">>>>>> SCOPED ERROR"
          error "scope:", scope
          error "###"
          error "function:", v
          error "###"
          error "evalled:", $eval
          error "###"
          error "error:", e
          error ">>>>>>>"
          throw e


## (public) version
We want to be able to identify ourselves in a logical and comparable way. To
achieve this we adhere to [Semantic Versioning 2.0.0](http://semver.org).

      version : 
        major : 0
        minor : 0 
        patch : 1 
        build : "dev"


## (public) start

      start : new Date().getTime()


## (public) module &lt; name &gt; [, exports... ]
This is where the magic happens baby. Base module function. Gives access to
import and where functions.

      module : (name, exports...) ->
        if modules[$name]?
          error "module #{$name} already defined"
        
        $name    = name
        $exports = (e for e in exports)

$imports = (if name is "Prelude" then [ ] else 
[ name: "Prelude", alias: null ])

        $imports = [ ]
        $defines = [ ]
        $scope   = { }


### (private) [ $define &lt; name &gt;, &lt; definition &gt; ]
Allows definition of functions and variables in modules scope.

        $define = (name, definition) ->
          if $scope[name]? 
            throw "cannot redeclare " + name
            
          $scope[name] = definition


### (public) [ .exports &lt; functions... &gt; ] 

        exports : (functions...) ->
          if $exports.length > 0
            throw Error "#{$name} already has exports defined"
          
          $exports = (f for f in functions)
          
          @


### (public) [ .imports &lt;module&gt; [alias] ]

        imports : (module, alias) ->
          $imports.push
            name: module
            alias: alias
          
          @

### (public) .where &lt;definition&gt;

        where : (definitions) ->
          if modules[$name]?
            throw new error "module #{$name} already defined"
          
          delete @exports
          delete @imports
          delete @where
          
          $defines = (v for v, k of definitions)
          
          for k, m of $imports
            if not modules[m.name]?
              file = ((m.name).split ".").join "/"
              path = "../modules/#{file}"
              
              try
                require path
              catch e
                error "Could not find module #{m.name}"
                throw e
              
              if not modules[m.name]?
                throw new Error "module #{m.name} not loaded"
            
            fs = (n for n, f of modules[m.name])
            if alias? $define alias, "modules." + m.name
            else      $define f,     "modules['#{m.name}'].#{f}" for f in fs
          
          $defines.map (n) -> $define n, definitions[n]
          
          for name in $exports
            @[name] = scoped($scope, definitions[name])
            if name is "main"
              $main = @[name]
          
          if $main?
            info "calling main of #{$name}"
            $main.call @
                    
          modules[$name] = @
    
    module?.exports = Lead
    window?.Lead = Lead
    global?.Lead = Lead
