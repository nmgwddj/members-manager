import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Popconfirm from 'antd/lib/popconfirm'
import { Link } from 'react-router'

import { compose, merge } from 'react-komposer'
import { useDeps } from 'react-simple-di'
import getTrackerLoader from '/imports/api/getTrackerLoader'

import Loading from '/imports/ui/components/loading'
import DataToString from '/imports/lib/helpers'

const ButtonGroup = Button.Group

const MemberDetail = ({
  member,
  loading,
  deleteMember
}) => {
  if (loading) return <Loading size='large' height='300px' />

  return (
    <Row gutter={16} id='member-detail'>
      <Col span={6}>
        <img
          style={{ width: '100%', border: '5px solid #eeeeee' }}
          src={member.headimgurl || '/images/default-avatar.png'}
        />
      </Col>
      <Col span={18} style={{ fontSize: '14px' }}>
        <div style={{ overflow: 'auto' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '40px', float: 'left' }}>
            用户昵称：{member.nickname}
          </h2>
          <ButtonGroup style={{ float: 'right' }}>
            <Button type='primary'>
              <Link to={`/admin/memberEdit/${member._id}`}>编辑</Link>
            </Button>
            <Popconfirm title='你确定要删除这个会员吗？' onConfirm={(e) => { deleteMember(e, member._id) }} okText='是' cancelText='否'>
              <Button type='danger'>删除</Button>
            </Popconfirm>
          </ButtonGroup>
        </div>
        <Row>
          <Col span={12}>
            <p>联系方式：{member.phoneNumber}</p>
            <p>会员卡号：{member.cardNumber}</p>
          </Col>
          <Col span={12}>
            <p>创建时间：{DataToString(member.createdAt)}</p>
            <p>更新时间：{DataToString(member.updatedAt)}</p>
          </Col>
          <p>备注信息：{member.remarks}</p>
        </Row>
      </Col>
    </Row>
  )
}

const reactiveMapper = ({ params, context }, onData) => {
  const { Meteor, Collections } = context
  const { Members } = Collections
  const { memberId } = params

  if (Meteor.subscribe('members.member', memberId).ready()) {
    const member = Members.findOne(memberId)
    onData(null, { member, loading: false })
  } else {
    onData(null, { member: [], loading: true })
  }
}

const depsToProps = (context, actions) => ({
  context,
  deleteMember: actions.admin.deleteMember
})

export default merge(
  compose(getTrackerLoader(reactiveMapper)),
  useDeps(depsToProps)
)(MemberDetail)
