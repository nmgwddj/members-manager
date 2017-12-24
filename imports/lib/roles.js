import _ from 'lodash'

export const hasPermission = (rule, roles) =>
  _.intersection(rule, roles).length > 0

// admin 管理员
// waiter 可以添加会员

export const ADMIN = ['admin']
export const WAITER = ['waiter']

export const DO_ADD_MEMBER = ['admin', 'waiter']
export const DO_EDIT_MEMBER = ['admin']

export const DO_ADD_USER = ['admin']
