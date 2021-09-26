import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext,
} from 'react'
import {
  SyncOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
} from '@ant-design/icons'
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
  Tag,
} from 'antd'
import moment from 'moment'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  labelAlign: 'right',
}
const MeetingDetailDrawer = (props) => {
  const [loading, setLoading] = useState(false)
  const [loadingCommonComponent, setLoadingCommonComponent] = useState(true)
  const [columns, setcolumns] = useState([
    {
      title: '会议标题',
      dataIndex: 'Title',
    },
    {
      title: '预定状态',
      dataIndex: 'State', // -1 暂存 0 流程中 1 流程结束 2终止
      render: (text, record, index) => {
        switch (text) {
          case -1:
            return (
              <Tag
                style={{
                  opacity: 1,
                }}
                color="rgba(96, 105, 114, 1)"
              >
                未开始
              </Tag>
            )
            break
          case 0:
            return (
              <Tag
                style={{
                  opacity: 1,
                }}
                color="rgba(33, 101, 249, 1)"
              >
                流程中
              </Tag>
            )
            break
          case 1:
            return (
              <Tag
                style={{
                  opacity: 1,
                }}
                color="rgba(238, 179, 81, 1)"
              >
                已结束
              </Tag>
            )
            break
          case 2:
            return (
              <Tag
                style={{
                  opacity: 1,
                }}
                color="rgba(250, 84, 28, 1)"
              >
                作废
              </Tag>
            )
            break

          default:
            break
        }
      },
    },
    {
      title: '会议开始时间',
      dataIndex: 'MeetingStart',
    },
    {
      title: '会议结束时间',
      dataIndex: 'MeetingEnd',
    },
    {
      title: '登记人',
      dataIndex: 'Name',
    },
    {
      title: '登记时间',
      dataIndex: 'ApplyDate',
    },
  ])

  const [searchParam, setSearchParam] = useState({})
  const [dataSource, setdataSource] = useState({})
  const [tableCount, setTableCount] = useState(0)
  const [tableName, setTableName] = useState('')
  const [selectedpublicIds, setSelectedpublicIds] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [meetingDetailList, setMeetingDetailList] = useState(
    props.MeetingDetailList
  )

  const [form] = Form.useForm()

  useEffect(() => {}, [])
  useEffect(() => {
    //
  }, [])

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

  const changeTableInfo = (info) => {
    // console.log(info)
    setTableCount(info.total)
    setTableName(info.name)
  }
  const selectChangeCallBack = (keys, rows) => {
    // console.log(keys, rows, '选中的咧')
    let newSelectedRowKeys = []
    newSelectedRowKeys = rows.map((key, index) => {
      return key.PublicId
    })
    setSelectedpublicIds(newSelectedRowKeys)
    setSelectedRowKeys(keys)
  }

  //   const closeDrawer = () => {
  //     props.refreshFun()
  //     props.onCancel()
  //   }

  return (
    <>
      <Drawer
        key="会议室预约详情"
        title="会议室预约详情"
        placement="right"
        closable={true}
        width={window.screen.width - 200}
        onClose={props.onCancel}
        visible={props.visible}
      >
        <Table
          columns={columns}
          dataSource={props.MeetingDetailList}
          // loading={loading}
          // onChange={this.handleTableChange}
        />
      </Drawer>
    </>
  )
}
export default MeetingDetailDrawer
