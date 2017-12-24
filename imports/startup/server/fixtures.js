export default ({ Collections, Meteor, Accounts, Roles }) => {
  const { Members, Users } = Collections

  const adminEmail = 'admin@example.com'
  if (!Users.findOne({
    'emails.0.address': adminEmail,
    'roles': { $elemMatch: { $eq: 'admin' } }
  })) {
    const adminId = Accounts.createUser({
      username: 'admin',
      password: 'admin.123',
      profile: {
        nickname: '系统管理员',
        sex: 1
      }
    })
    Accounts.addEmail(adminId, adminEmail)
    Roles.addUsersToRoles(adminId, ['admin'])
  }

  // Members.remove({})
  if (Members.find().count() === 0) {
    const members = [{
      nickname: '张三',
      phoneNumber: '13520322335',
      headimgurl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      cardNumber: '20170618',
      remarks: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      nickname: '李四',
      phoneNumber: '18814815707',
      headimgurl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      cardNumber: '20170619',
      remarks: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    members.map((member, i) => {
      Members.insert({...member})
    })
  }
}
