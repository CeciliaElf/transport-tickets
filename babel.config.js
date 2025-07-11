// babel-preset-taro 更多选项和默认值：
// https://docs.taro.zone/docs/next/babel-config
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: false,
      compiler: 'webpack5',
      useBuiltIns: process.env.TARO_ENV === 'h5' ? 'usage' : false
    }]
  ],
  plugins: [
    [
      'transform-define',
      {
        'process.env.TARO_ENV': process.env.TARO_ENV,
        'ENABLE_INNER_HTML': true,
        'ENABLE_ADJACENT_HTML': true,
        'ENABLE_CLONE_NODE': true,
        'ENABLE_CONTAINS': true,
        'ENABLE_SIZE_APIS': true,
        'ENABLE_RTL': true,
        'ENABLE_TEMPLATE_CONTENT': true
      }
    ]
  ]
}
