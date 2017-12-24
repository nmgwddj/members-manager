import React from 'react'
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import Webcam from 'react-webcam'
import { compose, merge } from 'react-komposer'
import { useDeps } from 'react-simple-di'
import getTrackerLoader from '/imports/api/getTrackerLoader'

import Loading from '/imports/ui/components/loading'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

const MemberNew = ({
  form,
  recapture,
  headimgurl,
  isEdit,
  member,
  loading,
  createMember,
  cleanPicture,
  capturePicture
}) => {
  if (isEdit && loading) return <Loading size='large' height='300px' />

  let ref
  const { getFieldDecorator } = form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  }

  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86'
  })(
    <Select style={{ width: 70 }}>
      <Option value='86'>+86</Option>
      <Option value='87'>+87</Option>
    </Select>
  )

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 6 }
  }

  return (
    <Row id='member-new'>
      <Col span={12} className='member-new-form'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label='会员名称'
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入会员名称', whitespace: true }],
              initialValue: isEdit ? member.nickname : ''
            })(
              <Input placeholder='用户真实名称或昵称' />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='会员卡号'
          >
            {getFieldDecorator('cardNumber', {
              rules: [{ required: true, message: '请输入会员卡号', whitespace: true }],
              initialValue: isEdit ? member.cardNumber : ''
            })(
              <Input placeholder='纯数字的会员卡号' />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='联系方式'
          >
            {getFieldDecorator('phoneNumber', {
              rules: [{ required: true, message: '请输入用户联系方式' }],
              initialValue: isEdit ? member.phoneNumber : ''
            })(
              <Input
                placeholder='手机或固定电话'
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='备注信息'
          >
            {getFieldDecorator('remarks', {
              rules: [{ required: false, message: '有什么信息需要备注' }],
              initialValue: isEdit ? member.remarks : ''
            })(
              <TextArea
                placeholder='可输入一些备注信息'
                autosize={{ minRows: 5, maxRows: 10 }}
              />
            )}
          </FormItem>
          <FormItem
            {...buttonItemLayout}
          >
            <Button
              type='primary'
              disabled={!headimgurl || recapture}
              onClick={(e) => { createMember(e, form, member && member._id) }}
            >
              { isEdit ? '更新资料' : '添加会员' }
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={(e) => { headimgurl && !recapture ? cleanPicture(e) : capturePicture(e, ref) }}
            >
              { headimgurl && !recapture ? '重新拍照' : '拍取相片' }
            </Button>
          </FormItem>
        </Form>
      </Col>
      <Col span={12}>
        {
          headimgurl && !recapture
          ? <img src={headimgurl} />
          : <Webcam
            audio={false}
            ref={(webcam) => { ref = webcam }}
            screenshotFormat='image/jpeg'
          />
        }
      </Col>
    </Row>
  )
}

const reactiveMapper = ({ params, context }, onData) => {
  const { Meteor, LocalState, Collections } = context
  const { Members } = Collections
  const headimgurl = LocalState.get('headimgurl') || null
  const recapture = LocalState.get('recapture') || false

  if (params.memberId) {
    const { memberId } = params
    if (Meteor.subscribe('members.member', memberId).ready()) {
      const member = Members.findOne(memberId)
      const headimgurl = LocalState.get('headimgurl') || member.headimgurl
      LocalState.set('headimgurl', LocalState.get('headimgurl') || member.headimgurl)

      onData(null, { recapture, headimgurl, isEdit: true, member, loading: false })
    } else {
      onData(null, { recapture, headimgurl, isEdit: true, member: {}, loading: true })
    }
  } else {
    onData(null, { recapture, headimgurl, isEdit: false })
  }
}

const depsToProps = (context, actions) => ({
  context,
  createMember: actions.admin.createMember,
  cleanPicture: actions.admin.cleanPicture,
  capturePicture: actions.admin.capturePicture
})

export default merge(
  compose(getTrackerLoader(reactiveMapper)),
  useDeps(depsToProps)
)(Form.create()(MemberNew))
