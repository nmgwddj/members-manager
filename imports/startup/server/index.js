import { Meteor } from 'meteor/meteor'
import context from './context'
import initAPIs from './initAPIs'
import fixtures from './fixtures'

Meteor.startup(() => {
  initAPIs(context)
  fixtures(context)
})
