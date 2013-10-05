# Prelude
Prelude is imported in every module.
    
    require('../lib/Lead')
    .module("Prelude")


# Exports

    .exports(
        "not"
        "fst"
        "snd"
    )

  
# Where

    .where
      False: false
      True: true
      
      otherwise: true
      
      not: (b) -> !b
      fst: (l) -> l[0]
      snd: (l) -> l[1]
