export default ({ Meteor, Collections, check }) => {
  const { Users } = Collections

  Meteor.methods({
    'users.create' (dataSource) {
      check(dataSource, Object)

      return Users.insert({
        ...dataSource,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    },
    'users.update' (dataSource, userId) {
      check(dataSource, Object)
      check(userId, String)

      return Users.update(userId, {
        $set: {
          ...dataSource,
          updatedAt: new Date()
        }
      })
    },
    'users.delete' (userId) {
      check(userId, String)

      return Users.remove(userId)
    }
  })
}
