export default (context) => {
  const { Accounts } = context

  // 创建用户时自动添加 roles 字段和 profile 字段
  Accounts.onCreateUser((options, user) => {
    user.roles = ['user']
    user.profile = options.profile
    return user
  })
}
