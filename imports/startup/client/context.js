import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { ReactiveDict } from 'meteor/reactive-dict'
import { Session } from 'meteor/session'
import { Roles } from 'meteor/alanning:roles'
import moment from 'moment'

import Collections from '/imports/api/collections'
import Global from './global'
import * as UserRoles from '/imports/lib/roles'

import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const LocalState = new ReactiveDict()

export default {
  Meteor,         // Meteor
  Accounts,       // 用户账户
  Roles,          // 权限管理
  Collections,    // 所有 Collection
  UserRoles,      // 权限配置
  Global,         // 全局数据，可以放微信的appId/appSecret，短信平台的 Id 和 Secret 等
  LocalState,     // 本地 State 组件
  Session,        // 本地 Session 组件
  moment          // 时间管理
}
