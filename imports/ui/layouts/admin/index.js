import React, { Component } from 'react'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Breadcrumb from 'antd/lib/breadcrumb'
import Icon from 'antd/lib/icon'
import Alert from 'antd/lib/alert'
import { browserHistory } from 'react-router'

import { compose, merge } from 'react-komposer'
import { useDeps } from 'react-simple-di'
import getTrackerLoader from '/imports/api/getTrackerLoader'

const { Header, Content, Footer, Sider } = Layout

class AdminLayout extends Component {
  render () {
    return (
      <Layout style={{ minHeight: '100vh' }} id='admin-layout'>
        <Sider
          collapsible
        >
          <div className='logo' />
          <Menu
            theme='dark'
            defaultSelectedKeys={['/admin/memberList']}
            selectedKeys={[this.props.location.pathname]}
            mode='inline'
            onClick={this.props.linkTo}
          >
            <Menu.Item key='/admin/memberList'>
              <Icon type='user' />
              <span>会员列表</span>
            </Menu.Item>
            <Menu.Item key='/admin/memberNew'>
              <Icon type='plus-circle-o' />
              <span>添加会员</span>
            </Menu.Item>
            <Menu.Item key='logout'>
              <Icon type='logout' />
              <span>退出登录</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: '12px 15px 10px 15px' }}>
            <Alert message='欢迎访问王爷府火锅会员管理系统' type='info' showIcon />
          </Header>
          <Breadcrumb
            routes={this.props.routes}
            params={this.props.params}
            separator='>'
            style={{ margin: '12px 15px' }}
          />
          <Content style={{ margin: '0 16px', backgroundColor: '#FFF', padding: '24px' }}>
            { this.props.children }
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

const reactiveMapper = ({ context }, onData) => {
  const { Meteor, Roles, UserRoles } = context

  if (!Meteor.userId() || (Meteor.user() && !Roles.userIsInRole(Meteor.userId(), UserRoles.DO_ADD_MEMBER))) {
    browserHistory.push('/login')
  } else {
    onData(null, {})
  }
}

const depsToProps = (context, actions) => ({
  context,
  linkTo: actions.admin.linkTo
})

export default merge(
  compose(getTrackerLoader(reactiveMapper)),
  useDeps(depsToProps)
)(AdminLayout)
