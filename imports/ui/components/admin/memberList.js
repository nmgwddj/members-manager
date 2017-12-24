import React from 'react'
import Table from 'antd/lib/table'
import Popconfirm from 'antd/lib/popconfirm'
import Avatar from 'antd/lib/avatar'
import Input from 'antd/lib/input'
import { Link } from 'react-router'
import { compose, merge } from 'react-komposer'
import { useDeps } from 'react-simple-di'
import getTrackerLoader from '/imports/api/getTrackerLoader'

import Loading from '/imports/ui/components/loading'
import DateToString from '/imports/lib/helpers'

const { Column } = Table
const { Search } = Input

const MemberList = ({
  members,
  loading,
  searchTerm,
  searchMember,
  deleteMember
}) => {
  if (loading) return <Loading size='large' height='300px' />

  const dataSource = []
  members.map((member, i) => {
    dataSource.push({
      key: member._id,
      ...member
    })
  })

  return (
    <div id='member-list'>
      <div style={{ overflow: 'auto' }}>
        <Search
          defaultValue={searchTerm}
          style={{ width: '260px', marginBottom: '10px', float: 'right' }}
          placeholder='搜索电话、姓名、卡号'
          onSearch={value => { searchMember(value) }}
          enterButton
        />
      </div>
      <Table dataSource={dataSource}>
        <Column
          title='会员姓名'
          dataIndex='nickname'
          key='nickname'
          render={(t, r) => (
            <Link to={`/admin/memberDetail/${r._id}`} style={{ lineHeight: '32px' }}>
              <Avatar
                style={{ float: 'left', marginRight: '10px' }}
                shape='square'
                src={r.headimgurl || '/images/default-avatar.png'}
              />{t}
            </Link>
          )}
        />
        <Column
          title='联系方式'
          dataIndex='phoneNumber'
          key='phoneNumber'
        />
        <Column
          title='会员卡号'
          dataIndex='cardNumber'
          key='cardNumber'
        />
        <Column
          title='创建时间'
          dataIndex='createdAt'
          key='createdAt'
          render={(t, r) => (
            DateToString(t)
          )}
        />
        <Column
          title='最后更新'
          dataIndex='updatedAt'
          key='updatedAt'
          render={(t, r) => (
            DateToString(t)
          )}
        />
        <Column
          title='操作'
          key='action'
          render={(text, record) => (
            <span>
              <Link to={`/admin/memberEdit/${record._id}`}>编辑</Link>
              <span className='ant-divider' />
              <Popconfirm title='你确定要删除这个会员吗？' onConfirm={(e) => { deleteMember(e, record.key) }} okText='是' cancelText='否'>
                <Link style={{color: '#F04134'}}>删除</Link>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
    </div>
  )
}

const reactiveMapper = ({ context }, onData) => {
  const { Meteor, Collections, LocalState } = context
  const { Members } = Collections
  const searchTerm = LocalState.get('searchTerm') || undefined
  LocalState.set('headimgurl', null)

  if (Meteor.subscribe('members.all', searchTerm).ready()) {
    const members = Members.find({}, {
      sort: { updatedAt: -1, createdAt: -1 }
    }).fetch()
    onData(null, { members, searchTerm, loading: false })
  } else {
    onData(null, { members: [], searchTerm, loading: true })
  }
}

const depsToProps = (context, actions) => ({
  context,
  searchMember: actions.admin.searchMember,
  deleteMember: actions.admin.deleteMember
})

export default merge(
  compose(getTrackerLoader(reactiveMapper)),
  useDeps(depsToProps)
)(MemberList)
