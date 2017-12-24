import React from 'react'
import Form from 'antd/lib/form'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { browserHistory } from 'react-router'
import { compose, merge } from 'react-komposer'
import { useDeps } from 'react-simple-di'
import getTrackerLoader from '/imports/api/getTrackerLoader'

const FormItem = Form.Item

const Login = ({ form, loginSubmit }) => {
  const { getFieldDecorator } = form

  return (
    <div className='login-page'>
      <img src='/images/logo.png' />
      <h2 style={{ fontSize: '20px', textAlign: 'center' }}>王爷府火锅</h2>
      <Form onSubmit={(e) => { loginSubmit(e, form) }} className='login-form'>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的用户名！' }]
          })(
            <Input prefix={<Icon type='user' style={{ fontSize: 13 }} />} placeholder='用户名' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码！' }]
          })(
            <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='密码' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  )
}

const reactiveMapper = ({ context }, onData) => {
  const { Meteor, UserRoles, Roles } = context
  const userId = Meteor.userId()

  if (userId && Roles.userIsInRole(userId, UserRoles.DO_EDIT_MEMBER)) {
    browserHistory.push('/admin/memberList')
  } else {
    onData(null, {})
  }
}

const depsToProps = (context, actions) => ({
  context,
  loginSubmit: actions.login.loginSubmit
})

export default merge(
  compose(getTrackerLoader(reactiveMapper)),
  useDeps(depsToProps)
)(Form.create()(Login))
