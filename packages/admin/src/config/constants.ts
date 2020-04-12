export const GENDER = [{
  text: '男',
  value: 1
}, {
  text: '女',
  value: 0
}]
export enum GENDER_MAP {
  '男' = 1,
  '女' = 0
}

export const ORDER_STATUS = [
  {
    value: 'not_started',
    text: '未开始'
  },
  {
    value: 'in_progress',
    text: '进行中'
  },
  {
    value: 'paused',
    text: '已暂停'
  },
  {
    value: 'finished',
    text: '完成'
  }
]

export enum ORDER_STATUS_MAP {
  'not_started' = '未开始',
  'in_progress' = '进行中',
  'paused' = '已暂停',
  'finished' = '完成',
}
