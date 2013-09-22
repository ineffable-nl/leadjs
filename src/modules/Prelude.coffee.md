# Prelude
Prelude is imported in every module.

    console.log "# Loading Prelude"
    
    require('../lib/Lead')
    .module("Prelude")


# Exports

    .exports(
        "not"
        "fst"
    )

  
# Where

    .where
      not: (b) -> !b
      fst: (l) -> l[0]
      snd: (l) -> l[1]


# D-bug

    console.log "# Prelude loaded"
