import * as types from './mutation-types'

export const openAlert = makeAction(types.OPENALERT)

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
