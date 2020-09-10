import { pipe, compose } from './prelude'
import { match } from './Maybe/functions/match'
import { some as some_ } from './Maybe/functions/some'
import { none as none_ } from './Maybe/functions/none'

export const patternMatch = pipe
export const composePatternMatch = compose
export const with_ = match
export const some = some_
export const none = none_

