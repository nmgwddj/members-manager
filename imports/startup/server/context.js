import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Random } from 'meteor/random'
import { check, Match } from 'meteor/check'
import { Roles } from 'meteor/alanning:roles'
import Collections from '../../api/collections'
import * as UserRoles from '/imports/lib/roles'
import moment from 'moment'
import Global from './global'

export default {
  Meteor,
  Accounts,
  Random,
  check,
  Match,
  Roles,
  Collections,
  UserRoles,
  Global,
  moment
}
