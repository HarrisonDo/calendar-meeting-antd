import React, { useState, useEffect, useRef, useContext } from 'react'
import {
  SyncOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  CarryOutTwoTone,
} from '@ant-design/icons'
import { Row, Col, Table, Button, DatePicker, Space, Form, message } from 'antd'
import './index.less'
import moment from 'moment'
import NewMeeting from './modal/new-meeting'

let meetingRoomList = []

// const { RangePicker } = DatePicker;

const EditableContext = React.createContext(null)

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  refreshList,
  addNewMeeting,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const [newme, setnewme] = useState(false)
  const [PublicId, setPublicId] = useState('')
  const [CustomBasicID, setCustomBasicID] = useState('')

  const inputRef = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) {
      // inputRef.current.focus()
    }
  }, [editing])

  const addPublicField = (dataIndex, record) => {
    // let newparams = {
    //   PublicId: 0,
    //   WorkTypeCode: 111,
    // }
    // let selectTimeText = dataIndex.split('&')
    // let selectTime = ''
    // switch (selectTimeText[0]) {
    //   case 'forenoon':
    //     selectTime = selectTimeText[1] + ' 08:00:00'
    //     break
    //   case 'afternoon':
    //     selectTime = selectTimeText[1] + ' 14:00:00'
    //     break

    //   default:
    //     break
    // }

    // let tempMeetingRoomIndex = meetingRoomList.find((roomItem) => {
    //   return roomItem.RoomName == record.MeetingRoom
    // })
    // let dd1 = tempMeetingRoomIndex.PublicId
    // let dd2 = tempMeetingRoomIndex.RoomName
    // let dd3 = tempMeetingRoomIndex.Id
    // let dd4 = tempMeetingRoomIndex.PublicId
    // let tempMeetingRoom = {
    //   Id: null,
    //   SaveValue: `[${dd1.toString()}]`,
    //   SaveName: JSON.stringify([dd2.toString()]),
    //   PublicId: `[${dd3.toString()}]`,
    //   LinkValue: JSON.stringify([dd4.toString()]),
    //   FieldName: 'MeetingRoom',
    // }
    // let temp = {
    //   dicJson: JSON.stringify({
    //     // MeetingRoom: JSON.stringify(tempMeetingRoom),
    //     MeetingRoom: tempMeetingRoomIndex.PublicId,
    //     MeetingStart: moment(selectTime).format('YYYY-MM-DD'),
    //     MeetingStartHour: moment(selectTime).format('LTS'),
    //     MeetType: '部门会议',
    //     ApplyDate: moment(selectTime).format('YYYY-MM-DD'),
    //     MeetingEnd: moment(selectTime).add(1, 'hours').format('YYYY-MM-DD'),
    //     MeetingEndHour: moment(selectTime).add(1, 'hours').format('LTS'),
    //     MainContent: null,
    //     Title: null,
    //     RoomAddress: tempMeetingRoomIndex.RoomAddress,
    //     RoomCapacity: tempMeetingRoomIndex.Capacity,
    //   }),
    //   MeetingRoomPublicID: tempMeetingRoomIndex.PublicId,
    //   MeetingRoomName: tempMeetingRoomIndex.RoomName,
    //   InTableEnName: '000007',
    //   WorkTypeEnName: '000003',
    //   CustomEnName: '00001',
    // }
    // console.log('temp', temp)
    // // setnewme(true)
    // MeetingRoomApply(temp).then((res) => {
    //   if (res.data.Success) {
    //     if (res.data.Data) {
    //       setPublicId(res.data.Data)
    //       // setnewme(true)
    //       const arr = window.location.hash.split('/')
    //       //调用全局tab 定义title标题方法
    //       const url = `/map/form-detail/${res.data.Data}/0`
    //       // ofaGlobal.props.utils.setCheckMenu(`会议室申请-${res.data.Data}`, url)
    //       //调用全局tab 定义title标题方法 end
    //       window.location.hash = `/map/form-detail/${res.data.Data}/0`
    //     }
    //   } else {
    //     // message.error('添加申报超时，请稍后再试')
    //     message.error(res.data.Error)
    //   }
    // })
    addNewMeeting()
  }

  const toggleEdit = () => {
    setEditing(!editing)
    console.log('dataIndex', dataIndex)
    console.log('record', record)
    // toMeetingVerifyTime(dataIndex, record)
    addPublicField(dataIndex, record)
    // form.setFieldsValue({
    //   [dataIndex]: record[dataIndex],
    // })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  const oncloseNewMeeting = () => {
    setnewme(false)
  }
  const onCancelNewMeeting = () => {
    setnewme(false)
  }

  let childNode = children

  if (editable) {
    childNode = (
      <>
        <div
          className="editable-cell-value-wrap"
          style={{
            // paddingRight: 24,
            textAlign: 'center',
          }}
        >
          <Button type="text" onClick={toggleEdit} icon={<PlusOutlined />} />
          {children}
        </div>
        <NewMeeting
          visible={newme}
          onOk={oncloseNewMeeting}
          onCancel={onCancelNewMeeting}
          PublicId={PublicId}
          refreshFun={refreshList}
        />
      </>
    )
  }

  return <td {...restProps}>{childNode}</td>
}
const initDataSource = [
  { MeetingRoom: '大会议室' },
  { MeetingRoom: '小会议室' },
  { MeetingRoom: '阅览室' },
  { MeetingRoom: '中心会议室' },
  { MeetingRoom: '行政会议室' },
  { MeetingRoom: '研发会议室' },
]

const MeetingResevation = (props) => {
  const initColumns = [
    {
      title: props.tableTitle,
      dataIndex: 'MeetingRoom',
    },
  ]
  const [columns, setcolumns] = useState([
    {
      title: props.tableTitle,
      dataIndex: 'MeetingRoom',
    },
  ])
  const [todayTime, settodayTime] = useState(moment())
  const [dataSource, setdataSource] = useState([
    { MeetingRoom: '小会议室' },
    { MeetingRoom: '阅览室' },
    { MeetingRoom: '中心会议室' },
    { MeetingRoom: '行政会议室' },
    { MeetingRoom: '研发会议室' },
  ])
  const [newMeetingVisible, setnewMeetingVisible] = useState(false)
  const [MeetingDetailDrawerVisible, setMeetingDetailDrawerVisible] =
    useState(false)
  const [MeetingDetailList, setMeetingDetailList] = useState([])

  useEffect(() => {
    generateCalendar()
  }, [])

  const weekChange = (date, dateString) => {
    console.log(date, dateString)
    settodayTime(moment(date))
    generateCalendar(date)
  }
  const getCurrentWeek = () => {
    const start = moment().weekday(0).format('YYYY-MM-DD') //本周一
    const end = moment().weekday(6).format('YYYY-MM-DD') //本周日
    return [start, end]
  }
  const changeWeekTime = (change) => {
    let tempdate = new Date()
    switch (change) {
      // 0上一周，1下一周
      case 0:
        tempdate = moment(todayTime).subtract(1, 'week').weekday(0)
        break
      case 1:
        tempdate = moment(todayTime).add(1, 'week').weekday(0)
        break
      default:
        break
    }

    settodayTime(moment(tempdate))
    generateCalendar(tempdate)
  }
  const refreshList = () => {
    generateCalendar(getCurrentWeek()[0])
  }

  const getMeetingRooms = () => {
    return new Promise((resolve, reject) => {
      props.GetMeetingRoomList().then((res) => {
        if (res.data.Success) {
          let tempRooms = []
          res.data.Data.forEach((element) => {
            tempRooms.push({
              MeetingRoom: element.RoomName,
              PublicId: element.PublicId,
              RoomAddress: element.RoomAddress,
            })
          })
          meetingRoomList = res.data.Data
          resolve(tempRooms)
        } else {
          message.warning(res.data.Error)
          resolve([])
        }
      })
    })
  }

  const generateCalendar = async (date) => {
    let thisWeekStart = date ? date : getCurrentWeek()[0]
    let tempColumns = initColumns.concat()
    let tempDataSource = []
    try {
      tempDataSource = await getMeetingRooms()
      console.log('done')
    } catch (message) {
      console.log(message)
    }

    let params = {
      time: moment(todayTime).format('YYYY-MM-DD'),
    }
    props.GetMeetingList(params).then((res) => {
      if (res.data.Success) {
        for (let i = 0; i < 7; i++) {
          tempColumns.push({
            title: ({ sortOrder, sortColumn, filters }) => (
              <>
                <div>
                  {moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')}
                </div>
                <div>{moment(thisWeekStart).add(i, 'days').format('dddd')}</div>
              </>
            ),
            dataIndex:
              'MeetingStart-' +
              moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD'),
            children: [
              {
                title: props.tablenoonText[0],
                dataIndex:
                  'forenoon&' +
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD'),
                editable: true,
              },
              {
                title: props.tablenoonText[1],
                dataIndex:
                  'afternoon&' +
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD'),
                editable: true,
              },
            ],
          })
          tempDataSource &&
            tempDataSource.forEach((element) => {
              element[
                'MeetingStart-' +
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
              ] = ''
              element[
                'forenoon&' +
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
              ] = ''
              element[
                'afternoon&' +
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
              ] = ''
            })
          res.data.Data.forEach((resElement) => {
            let dateIndex = tempDataSource.findIndex((fitem) => {
              return resElement.MeetingRoom == fitem.PublicId
            })
            let dateStartnoon = ''
            let dateEndnoon = ''
            let dateStartDay =
              resElement.MeetingStart + ' ' + resElement.MeetingStartHour
            let dateEndDay =
              resElement.MeetingEnd + ' ' + resElement.MeetingEndHour
            let timeDifference = moment(resElement.MeetingEnd).diff(
              moment(resElement.MeetingStart),
              'days'
            )
            // 开始时间是大于循环的当前天
            let StartDaylessthanToday =
              moment(resElement.MeetingStart).diff(
                moment(
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
                ),
                'days'
              ) < 0
                ? true
                : false
            // 开始时间是否等于循环的当前天
            let TodayInStartDay =
              moment(resElement.MeetingStart).diff(
                moment(
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
                ),
                'days'
              ) === 0
                ? true
                : false

            // 结束时间是否大于循环的当前天
            let EndDayMoreToday =
              moment(resElement.MeetingEnd).diff(
                moment(
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
                ),
                'days'
              ) >= 1
                ? true
                : false
            // 结束时间是否等于循环的当前天
            let TodayInEndDay =
              moment(resElement.MeetingEnd).diff(
                moment(
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
                ),
                'days'
              ) === 0
                ? true
                : false
            // 整个会议时间是否等于循环的当前天
            let justToday =
              TodayInStartDay &&
              moment(resElement.MeetingEnd).diff(
                moment(
                  moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
                ),
                'days'
              ) === 0
                ? true
                : false
            if (
              (TodayInStartDay && EndDayMoreToday && !StartDaylessthanToday) ||
              (!TodayInStartDay && EndDayMoreToday && StartDaylessthanToday) ||
              (!TodayInStartDay && TodayInEndDay && StartDaylessthanToday)
            ) {
              dateStartnoon =
                'forenoon&' +
                moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
              dateEndnoon =
                'afternoon&' +
                moment(thisWeekStart).add(i, 'days').format('YYYY-MM-DD')
            } else if (justToday) {
              if (
                moment(dateStartDay).format('h:mm a').split(' ')[1] ==
                props.tablenoonText[0]
              ) {
                dateStartnoon = 'forenoon&' + resElement.MeetingStart
              } else if (
                moment(dateStartDay).format('h:mm a').split(' ')[1] ==
                props.tablenoonText[1]
              ) {
                dateEndnoon = 'afternoon&' + resElement.MeetingStart
              }
              if (
                moment(dateEndDay).format('h:mm a').split(' ')[1] ==
                props.tablenoonText[0]
              ) {
                dateStartnoon = 'forenoon&' + resElement.MeetingEnd
              } else if (
                moment(dateEndDay).format('h:mm a').split(' ')[1] ==
                props.tablenoonText[1]
              ) {
                dateEndnoon = 'afternoon&' + resElement.MeetingEnd
              }
            }
            if (dateStartnoon && dateIndex != -1) {
              tempDataSource[dateIndex][dateStartnoon] = (
                <div
                  className="has-meeting"
                  onClick={() => {
                    getMeetingDetailTable(
                      tempDataSource[dateIndex],
                      dateStartnoon
                    )
                  }}
                >
                  <CarryOutTwoTone
                    style={{
                      fontSize: 18,
                    }}
                  />
                </div>
              )
            }
            if (dateEndnoon && dateIndex != -1) {
              tempDataSource[dateIndex][dateEndnoon] = (
                <div
                  className="has-meeting"
                  onClick={() => {
                    getMeetingDetailTable(
                      tempDataSource[dateIndex],
                      dateEndnoon
                    )
                  }}
                >
                  <CarryOutTwoTone
                    style={{
                      fontSize: 18,
                    }}
                  />
                </div>
              )
            }
          })
        }
        setcolumns(tempColumns)
        setdataSource(tempDataSource)
      } else {
        message.warning(res.data.Error)
      }
    })
    console.log(tempColumns)
    console.log(tempDataSource)
  }

  const getMeetingDetail = (meetingdata, timedata) => {
    let params = {
      time: timedata.split('&')[1]
        ? timedata.split('&')[1]
        : moment().format('YYYY-MM-DD'),
      type: timedata.split('&')[0] == 'forenoon' ? 0 : 1, //0上午 1下午
      MeetingRoom: meetingdata.PublicId,
    }
    return new Promise((resolve, reject) => {
      props
        .showMeetingDetail(params)
        .then((res) => {
          if (res.data.Success) {
            setMeetingDetailList(res.data.Data)
            resolve(true)
          } else {
            reject(false)
            message.warning(res.data.Error)
          }
        })
        .catch((err) => {
          message.warning(err)
          reject(false)
        })
    })
    // showMeetingDetail(meetingdata, timedata)
  }

  const getMeetingDetailTable = (meetingdata, timedata) => {
    getMeetingDetail(meetingdata, timedata).then((res) => {
      if (res) {
        setMeetingDetailDrawerVisible(!MeetingDetailDrawerVisible)
      }
    })
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }
  const handleSave = (row) => {}

  const changeColums = (columns) =>
    columns.map((col) => {
      if (col.children) {
        return {
          // ...col,
          editable: col.editable ? col.editable : false,
          dataIndex: col.dataIndex,
          title: col.title,
          children: changeColums(col.children),
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: handleSave,
            refreshList: refreshList,
            addNewMeeting: props.addNewMeeting,
          }),
        }
      }
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: handleSave,
          refreshList: refreshList,
          addNewMeeting: props.addNewMeeting,
        }),
      }
    })

  return (
    <div className="meeting-resevation-content">
      <Row style={{ height: '100%' }}>
        <Col span={8} className="content-title">
          <div style={{ marginRight: '10px' }}>{props.MainTitle}</div>
          <SyncOutlined onClick={refreshList} />
        </Col>
        <Col span={8} className="content-changeBtn">
          <Space>
            <Button
              style={{ marginRight: '20px' }}
              type="text"
              shape="circle"
              onClick={() => changeWeekTime(0)}
              icon={<LeftOutlined />}
            />
            <div className="this-week">
              <DatePicker
                defaultValue={todayTime}
                value={todayTime}
                onChange={weekChange}
                picker="week"
                bordered={false}
                allowClear={false}
              />
            </div>
            <Button
              type="text"
              shape="circle"
              onClick={() => changeWeekTime(1)}
              icon={<RightOutlined />}
            />
          </Space>
        </Col>
        <Col span={24} style={{ height: 'calc(100% - 35px)', marginTop: 10 }}>
          <Table
            components={components}
            columns={changeColums(columns)}
            dataSource={dataSource}
            bordered
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  )
}
export default MeetingResevation
