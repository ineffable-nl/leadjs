# Test: Prelude

    require("../lib/Lead")

    .module("Test.Prelude")
    .exports(
      "main"
    )
    .where
      l : [1,2,3,4,5]
      main: ->
        expect = require("chai").expect
        assert = require("chai").assert

        describe "Prelude", ->
          describe "List operations", ->
            info "head"

            it "l = [1,2,3,4,5]", ->
              debug "l = #{l}"

              expect(l).eql [1,2,3,4,5]

            describe "head", ->
              debug "head l = #{head l}"
              debug "head [] = #{head []}"

              it "[#{l}], should return 1", ->
                expect(head l).equals 1
              it "[], should be undefined", ->
                expect(head []).is.an "undefined"

            describe "last", ->
              debug "last l = #{last l}"
              debug "last [] = #{last []}"

              it "[#{l}], should return 5", ->
                expect(last l).equal 5
              it "[], should be undefined", ->
                expect(last []).be.an "undefined"

            describe "tail", ->
              debug "tail l = #{tail l}"
              debug "tail [] = #{tail []}"

              it "[#{l}], should return [2,3,4,5]", ->
                expect(tail l).eql [2,3,4,5]
              it "[], should be undefined", ->
                expect(tail []).be.an "undefined"

            describe "init", ->
              debug "init l = #{init l}"
              debug "init [] = #{init []}"

              it "[#{l}], should return [1,2,3,4]", ->
                expect(init l).eql [1,2,3,4]
              it "[], should be undefined", ->
                expect(init []).be.an "undefined"



