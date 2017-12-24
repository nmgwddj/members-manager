import _ from 'lodash'
import message from 'antd/lib/message'
import { browserHistory } from 'react-router'

export default {
  linkTo ({ Meteor }, item) {
    if (item.key === 'logout') {
      Meteor.logout()
    }
    browserHistory.push(item.key)
  },
  capturePicture ({ Meteor, LocalState, Global }, event, webcam) {
    event.preventDefault()
    const imgSrc = webcam.getScreenshot()
    Meteor.call('files.uploadFile', imgSrc, 'image/jpeg', 'jpg', (err, res) => {
      if (err) {
        message.error(`上传会员头像失败，${err.reason || err.message}`)
      } else {
        message.success(`截取会员头像成功。`)
        LocalState.set('headimgurl', Global.qiniu.DOMAIN_NAME + res)
        LocalState.set('recapture', false)
      }
    })
  },
  cleanPicture ({ LocalState }, event) {
    LocalState.set('recapture', true)
  },
  deleteMember ({ Meteor }, event, userId) {
    event.preventDefault()
    Meteor.call('members.delete', userId, (err, res) => {
      if (err) {
        message.error(err.message)
      } else {
        browserHistory.push('/admin/memberList')
      }
    })
  },
  createMember ({ Meteor, LocalState }, event, form, userId) {
    event.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        const action = userId ? 'update' : 'create'
        const dataSource = {
          ...values,
          headimgurl: LocalState.get('headimgurl')
        }

        Meteor.call(`members.${action}`, dataSource, userId, (err, res) => {
          if (!err) {
            browserHistory.push('/admin/memberList')
          } else {
            message.error(res.error)
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
  },
  searchMember ({ LocalState }, value) {
    LocalState.set('searchTerm', value)
  }
}
