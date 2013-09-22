# Data.List

    require("../../lib/Lead")
    .module("Data.List")
    .exports(
      "head"
      "last"
      "tail"
      "init"
      "nil"
      "length"
    )
    .where
      head: (a) -> a.slice  0,  1
      last: (a) -> a.slice -1
      tail: (a) -> a.slice  1
      init: (a) -> a.slice  0, -1
      nil: (a) -> (length a) is 0
      length: (a) -> a.length
