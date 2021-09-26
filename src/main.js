import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import MeetingResevation from './modules/index'

const CalendarComponent = (props) => {
  const [tablenoonText, settableafternoonText] = useState(
    props.tablenoonText ? props.tablenoonText : ['am', 'pm']
  )
  //   const [tablenoonText, settableforenoonText] = useState('PM')
  const getMeetingList = (params) => {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          Success: true,
          Data: [
            {
              Title: '项目汇报',
              MeetingRoom: '14145',
              MeetingStartHour: '15:00:00',
              MeetingEndHour: '16:00:00',
              MeetingStart: '2021-09-23',
              MeetingEnd: '2021-09-23',
            },
            {
              Title: '生产会议',
              MeetingRoom: '37204',
              MeetingStartHour: '10:47:26',
              MeetingEndHour: '17:47:35',
              MeetingStart: '2021-09-20',
              MeetingEnd: '2021-09-20',
            },
            {
              Title: '322',
              MeetingRoom: '37204',
              MeetingStartHour: '08:00:00',
              MeetingEndHour: '09:00:00',
              MeetingStart: '2021-09-21',
              MeetingEnd: '2021-09-21',
            },
            {
              Title: '部门会议',
              MeetingRoom: '80519',
              MeetingStartHour: '10:00:00',
              MeetingEndHour: '11:00:00',
              MeetingStart: '2021-09-22',
              MeetingEnd: '2021-09-22',
            },
          ],
        },
      })
    })
  }
  const GetMeetingRoomList = (params) => {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          Success: true,
          Data: [
            {
              Id: 1002,
              PublicId: 14145,
              WorkKeyNum: '',
              CreateTime: '2021-07-26 21:33',
              CreateUser: 1044,
              UpdateTime: '2021-08-09 17:55',
              UpdateUser: 1044,
              RoomName: '大会议室',
              LinkName: '王小伟',
              Capacity: '50',
              ManageDeptID: '23',
              RoomAddress: '101室',
              Configuredevice: '投影仪、网络电话',
            },
            {
              Id: 1003,
              PublicId: 14377,
              WorkKeyNum: '',
              CreateTime: '2021-07-29 16:44',
              CreateUser: 1044,
              UpdateTime: '2021-08-09 17:58',
              UpdateUser: 1044,
              RoomName: '小会议室',
              LinkName: '王敏',
              Capacity: '30',
              ManageDeptID: '41',
              RoomAddress: '103室',
              Configuredevice: '电子屏',
            },
            {
              Id: 1004,
              PublicId: 14462,
              WorkKeyNum: '',
              CreateTime: '2021-07-30 15:41',
              CreateUser: 1044,
              UpdateTime: '2021-08-09 17:57',
              UpdateUser: 1044,
              RoomName: '接待室',
              LinkName: '李丹',
              Capacity: '10',
              ManageDeptID: '9',
              RoomAddress: '图书室',
              Configuredevice: '移动黑板',
            },
            {
              Id: 1005,
              PublicId: 16636,
              WorkKeyNum: '',
              CreateTime: '2021-08-08 14:25',
              CreateUser: 11476,
              UpdateTime: '2021-08-09 17:56',
              UpdateUser: 1044,
              RoomName: '党委会议室',
              LinkName: '柏榕',
              Capacity: '12',
              ManageDeptID: '41',
              RoomAddress: '201',
              Configuredevice: '玻璃黑板',
            },
            {
              Id: 1006,
              PublicId: 29007,
              WorkKeyNum: '',
              CreateTime: '2021-09-02 15:24',
              CreateUser: 1044,
              UpdateTime: null,
              UpdateUser: null,
              RoomName: '测试推送',
              LinkName: '管理员',
              Capacity: '',
              ManageDeptID: '',
              RoomAddress: '大厅',
              Configuredevice: '',
            },
            {
              Id: 1007,
              PublicId: 37204,
              WorkKeyNum: '',
              CreateTime: '2021-09-04 12:35',
              CreateUser: 11476,
              UpdateTime: '2021-09-09 10:18',
              UpdateUser: 1044,
              RoomName: '公司大会议室',
              LinkName: '邹敏丽',
              Capacity: '30',
              ManageDeptID: '41',
              RoomAddress: '湖南岳麓区鑫苑国际',
              Configuredevice: '',
            },
            {
              Id: 1008,
              PublicId: 55379,
              WorkKeyNum: '',
              CreateTime: '2021-09-09 16:11',
              CreateUser: 11476,
              UpdateTime: null,
              UpdateUser: null,
              RoomName: '娱乐室',
              LinkName: '测试人',
              Capacity: '5',
              ManageDeptID: '21',
              RoomAddress: '7楼',
              Configuredevice: '情况说明',
            },
            {
              Id: 1009,
              PublicId: 80519,
              WorkKeyNum: '',
              CreateTime: '2021-09-22 10:48',
              CreateUser: 11476,
              UpdateTime: '2021-09-22 10:48',
              UpdateUser: 11476,
              RoomName: '2021大会议室',
              LinkName: '邹敏丽',
              Capacity: '30',
              ManageDeptID: '41',
              RoomAddress: '鑫苑国际大厦',
              Configuredevice: '',
            },
          ],
        },
      })
    })
  }

  const addNewMeeting = () => {
    alert('update')
  }

  const showMeetingDetail = (parmas) => {
    alert('showMeetingDetail', parmas)
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          Success: true,
          Data: [
            {
              Title: '项目汇报',
              RoomAddress: '101室',
              MeetingStart: '2021-09-23 15:00:00',
              MeetingEnd: '2021-09-23 16:00:00',
              ApplyUser: '26944',
              ApplyDate: '2021-09-23',
              State: 1,
              MeetingRoom: '14145',
              Name: '刘丽萍',
            },
          ],
        },
      })
    })
  }

  return (
    <div>
      <MeetingResevation
        addNewMeeting={addNewMeeting}
        showMeetingDetail={showMeetingDetail}
        GetMeetingList={getMeetingList}
        GetMeetingRoomList={GetMeetingRoomList}
        MainTitle={props.MainTitle || 'Meeting room reservation'}
        tableTitle={props.tableTitle || 'Meeting room'}
        tablenoonText={tablenoonText}
      />
    </div>
  )
}
// export default CalendarComponent
ReactDOM.render(<CalendarComponent />, document.getElementById('root'))
