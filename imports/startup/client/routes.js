import React from 'react'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import { injectDeps } from 'react-simple-di'

import context from './context'
import actions from '/imports/ui/actions'

import AdminLayout from '/imports/ui/layouts/admin'
import EmptyLayout from '/imports/ui/layouts/empty'

import Login from '/imports/ui/components/login'
import MemberList from '/imports/ui/components/admin/memberList'
import MemberNew from '/imports/ui/components/admin/memberNew'
import MemberDetail from '/imports/ui/components/admin/memberDetail'

// 将全局 context 和 actions 都注入到每个 Layout 中
// 这样每个 Layout 下面的 components 就都可以得到全局的 context 和 actions 了
const injectDependencies = injectDeps(context, actions)

const Routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={injectDependencies(EmptyLayout)}>
      <IndexRedirect to='/login' />
      <Route path='/login' component={Login} />
    </Route>

    <Route name='admin' path='/admin' breadcrumbName='管理后台' component={injectDependencies(AdminLayout)}>
      <IndexRedirect to='memberList' />
      <Route name='memberList' path='/admin/memberList' breadcrumbName='会员列表' component={MemberList} />
      <Route name='memberNew' path='/admin/memberNew' breadcrumbName='添加会员' component={MemberNew} />
      <Route name='memberEdit' path='/admin/memberEdit/:memberId' breadcrumbName='编辑资料' component={MemberNew} />
      <Route name='memberDetail' path='/admin/memberDetail/:memberId' breadcrumbName='用户详情' component={MemberDetail} />
    </Route>
  </Router>
)

export default Routes
