import React, { useState, useEffect, useImperativeHandle } from 'react'
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  DatePicker,
  Space,
  Popconfirm,
  Form,
  Input,
  Modal,
  Select,
  TreeSelect,
  Drawer,
} from 'antd'
import moment from 'moment'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  labelAlign: 'right',
}
const NewMeeting = (props) => {
  const [loading, setLoading] = useState(false)
  const [todayTime, setTodayTime] = useState(moment())
  const [columns, setColumns] = useState([
    {
      title: '会议室',
      dataIndex: 'MeetingRoom',
    },
  ])
  const [basicInfo, setBaseInfo] = useState({})
  const [form] = Form.useForm()

  useEffect(() => {}, [])

  useImperativeHandle(props.onRef, () => ({
    onFill: (value) => {
      form.setFieldsValue(value)
      setEditUserNum(form.getFieldValue('UserNum'))
    },
    onReset: (value) => {
      getDepartCode(value)
      form.resetFields()
    },
  }))

  const initForm = (
    <Form
      form={form}
      // name="serverDetail"
      {...layout}
      // initialValues={initValues}
    >
      <Form.Item label="会议主题" name="Title">
        <Input />
      </Form.Item>
      <Form.Item label="Select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="TreeSelect">
        <TreeSelect
          treeData={[
            {
              title: 'Light',
              value: 'light',
              children: [{ title: 'Bamboo', value: 'bamboo' }],
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>
    </Form>
  )
  const submitForm = () => {
    form
      .validateFields()
      .then((item) => {
        item.Region = RegionId
        let publicField = {
          ...item,
        }
        addPublicField(publicField)
        // toBeDetail()
      })
      .catch((info) => {})
  }

  const closeDrawer = () => {
    props.refreshFun()
    props.onCancel()
  }

  return (
    <>
      {props.btnOpenType == 1 && (
        <Drawer
          title={`新增` + newPrjName}
          width={500}
          onClose={props.onCancel}
          visible={props.visible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={props.onCancel} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={submitForm} type="primary">
                确定
              </Button>
            </div>
          }
        >
          {initForm}
        </Drawer>
      )}
    </>
  )
}
export default NewMeeting
