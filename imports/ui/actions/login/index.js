import _ from 'lodash'
import message from 'antd/lib/message'
import { browserHistory } from 'react-router'

export default {
  loginSubmit ({ Meteor }, event, form) {
    event.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values
        Meteor.loginWithPassword(username, password, (err, res) => {
          if (!err) {
            browserHistory.push('/admin/memberList')
          } else {
            message.error(err.message)
          }
        })
      } else {
        _.values(err).map((obj, i) => {
          if (i === 0) {
            message.error(obj.errors[0].message)
          }
        })
      }
    })
  }
}
