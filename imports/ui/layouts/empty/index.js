import React from 'react'
import Layout from 'antd/lib/layout'

const { Content } = Layout

const EmptyLayout = ({ children }) => {
  return (
    <Layout id='empty-layout'>
      <Content>
        { children }
      </Content>
    </Layout>
  )
}

export default EmptyLayout
