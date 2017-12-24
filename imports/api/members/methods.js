export default ({ Meteor, Collections, check }) => {
  const { Members } = Collections

  Meteor.methods({
    'members.create' (dataSource) {
      check(dataSource, Object)

      return Members.insert({
        ...dataSource,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    },
    'members.update' (dataSource, memberId) {
      check(dataSource, Object)
      check(memberId, String)

      return Members.update(memberId, {
        $set: {
          ...dataSource,
          updatedAt: new Date()
        }
      })
    },
    'members.delete' (memberId) {
      check(memberId, String)

      return Members.remove(memberId)
    }
  })
}
