export default ({Meteor, Collections, check, Match, Roles}) => {
  const { Users } = Collections
  const DEVELOPMENT = Meteor.isDevelopment

  Meteor.publish('users.all', (searchTerm) => {
    if (DEVELOPMENT) Meteor._sleepForMs(500)
    return Users.find()
  })
}
