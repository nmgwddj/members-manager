import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Spin from 'antd/lib/spin'

export default ({ size, height }) =>
  <Row
    type='flex'
    justify='space-around'
    align='middle'
    style={{ minHeight: height }}
  >
    <Col>
      <Spin size={size} />
    </Col>
  </Row>
