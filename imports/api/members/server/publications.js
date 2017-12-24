export default ({Meteor, Collections, check, Match, Roles}) => {
  const { Members } = Collections
  const DEVELOPMENT = Meteor.isDevelopment

  Meteor.publish('members.all', (searchTerm) => {
    check(searchTerm, Match.OneOf(String, null, undefined))
    if (DEVELOPMENT) Meteor._sleepForMs(500)

    let query = {}
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i')
      query = {
        $or: [
          { nickname: regex },
          { phoneNumber: regex },
          { cardNumber: regex }
        ]
      }
    }

    return Members.find(query)
  })

  Meteor.publish('members.member', (id) => {
    if (DEVELOPMENT) Meteor._sleepForMs(500)
    return Members.find({ _id: id })
  })
}
