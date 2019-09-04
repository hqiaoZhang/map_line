const posis =  [
  [106.503581, 29.530042],
  [106.500515, 29.536918],
  [106.5065, 29.541863],
  [106.507978, 29.539263],
  [106.504586, 29.538715]
]

const posis2 = [
  [106.509583, 29.532042],
  [106.506683, 29.532042],
]

const posis3 = [
  [106.510179, 29.537731],
  [106.503581, 29.532042]
]

export default {
  url: '/map/gridUser',
  enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result": {
      "posis|2-5": [
        {
          'name': '@cname',
          'lnglat|+1': posis
        }
      ],
      "posis2|2": [{
        'name': '@cname',
        'lnglat|+1': posis2
      }],
      "posis3|1-2": [{
        'name': '@cname',
        'lnglat|+1': posis3
      }]
    }
  }
}