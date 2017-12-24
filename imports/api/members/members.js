// Definition of the links collection

import { Mongo } from 'meteor/mongo'

const Members = new Mongo.Collection('members')

Members.deny({
  insert () {
    return true
  },
  update () {
    return true
  },
  remove () {
    return true
  }
})

export default Members
