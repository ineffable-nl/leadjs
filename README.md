lead-js
=======
LeadJS. Functional Javascript.

Style guidelines
----------------
Some guides.
- To prevent name collisions:

  - Prepend Lead-global private with
  - Prepend function private with _
  - Variables without prefix are global or arguments of function

- Keep variables, function and arguments as short as possible, given the
meaning is clear, e.g.:

  - sin(x), not sin(floatingVariable)
  - head(a) not head(listOrSomethingDisguisingAsList)
  - add(title, body) not add(s, t)

- Variable names:

  - {x, y, z} ∈ ℜ (Real)
  - {i, j, n} ∈ ℕ (Natural)
  - {a, b}    ∈ Polymorphic
  - {l, m}    ∈ List
  - {c}       ∈ Char
  - {s, t}    ∈ [Char] ∨ String
