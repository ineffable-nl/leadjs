# Lead
We start with a global entry point into the library. This is where all the
magic happens, so your global namespace won't get too polluted.

    Lead = do ->
      modules = []
      error   = console.log
      #debug   = -> false
      debug   = console.log


## (private) scopedFunction &lt;scope&gt; &lt;func&gt; 

      scopedFunction = (scope, v) ->
        v = "[#{v}]" if Array.isArray v
        v = "{#{v}}" if typeof v is 'object'
        
        """
        ((function() {
          #{("var #{k} = #{scope[k]}" for k of scope).join("\n  ")}
          return ( #{v} )
        })())
        """


## (private) scoped

      scoped = (scope, f) ->
        try
          eval scopedFunction(scope, f)
        catch e
          error ">>>>>> SCOPED ERROR"
          error "scope:", scope
          error "###"
          error "function:", f
          error "###"
          error "evalled:", scopedFunction(scope, f)
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


## (public) module &lt;name&gt; [exports...]
This is where the magic happens baby. Base module function. Gives access to
import and where functions.

      module : (name, exports...) ->
        debug "Lead::module", name, exports
        
        if modules[$name]?
          throw new error "module #{$name} already defined"
        
        $name    = name
        $exports = (e for e in exports)
        $imports = (if name is "Prelude" then [ ] else 
                    [ name: "Prelude", alias: null ])
        $defines = [ ]
        $scope   = { }


### (private) [ $define &lt;name&gt; &lt;definition&gt; ]
Allows definition of functions and variables in modules scope.

        $define = (name, definition) ->
          if $scope[name]? 
            throw "cannot redeclare " + name
            
          $scope[name] = definition


### (public) [ .exports &lt;functions...&gt; ] 

        exports : (functions...) ->
          debug "#{$name}.exports", functions
          
          if $exports.length > 0
            throw Error "#{$name} already has exports defined"
          
          $exports = (f for f in functions)
          
          @


### (public) [ .imports &lt;module&gt; [alias] ]

        imports : (module, alias) ->
          debug "#{$name}.imports", module, alias
          
          $imports.push
            name: module
            alias: alias
            
          @


### (public) .where &lt;definition&gt;

        where : (definitions) ->
          debug "#{$name}.where", definitions
          
          if modules[$name]?
            throw new error "module #{$name} already defined"
          
          delete @exports
          delete @imports
          delete @where
          
          $defines = (v for v, k of definitions)
          
          debug "$imports", $imports
          
          for k, m of $imports
            debug "###### Import #{m.name}"
            
            if not modules[m.name]?
              file = ((m.name).split ".").join "/"
              debug "file", file, "from", m.name
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
          
          for name, definition of definitions
            this[name] = scoped($scope, definition)
            $main = this[name] if name is "main"
          
          if $main?
            debug ">>> Found main function in #{$name}.. running now"
            do $main
            debug "<<<"
          else
            debug "Main function not found in #{$name}"
            
          modules[$name] = @
          @
    
    module?.exports = Lead
    window?.Lead = Lead
