import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './order.scss'

export default class Index extends Component {
  componentDidMount() {
    console.log('Page loaded.')
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="order">
        <Text>我的订单</Text>
      </View>
    )
  }
}
